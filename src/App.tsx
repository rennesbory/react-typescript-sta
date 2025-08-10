import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Play, X, Download, ArrowRight, ArrowLeft, Pause } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { toast, Toaster } from 'sonner'
import { HowItWorks } from '@/components/HowItWorks'

// Import static assets with fallback handling
// Note: Replace with actual logo when available
const feelisLogo = '/src/assets/images/feelis_logo.png'

// Video paths - using relative paths for better compatibility
const heroVideo = '/src/assets/videos/emoly_intro_trim.mp4'
const webAngry = '/src/assets/videos/web_Animation_background_angry.mp4'
const webAnxious = '/src/assets/videos/web_Animation_background_anxious.mp4'
const webCalm = '/src/assets/videos/web_Animation_background_calm.mp4'
const webEmpty = '/src/assets/videos/web_Animation_background_empty.mp4'
const webExcited = '/src/assets/videos/web_Animation_background_excited.mp4'
const webGrateful = '/src/assets/videos/web_Animation_background_grateful.mp4'
const webHappy = '/src/assets/videos/web_Animation_background_happy.mp4'
const webSad = '/src/assets/videos/web_Animation_background_sad.mp4'
const webTired = '/src/assets/videos/web_Animation_background_tired.mp4'

// Gallery videos array
const galleryVideos = [
  { src: webAngry, alt: 'Angry emotion background animation' },
  { src: webAnxious, alt: 'Anxious emotion background animation' },
  { src: webCalm, alt: 'Calm emotion background animation' },
  { src: webEmpty, alt: 'Empty emotion background animation' },
  { src: webExcited, alt: 'Excited emotion background animation' },
  { src: webGrateful, alt: 'Grateful emotion background animation' },
  { src: webHappy, alt: 'Happy emotion background animation' },
  { src: webSad, alt: 'Sad emotion background animation' },
  { src: webTired, alt: 'Tired emotion background animation' }
]

interface GalleryVideoProps {
  video: { src: string; alt: string }
  index: number
  onVideoClick: (content: any) => void
}

function GalleryVideo({ video, index, onVideoClick }: GalleryVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Reset error state when video src changes
  useEffect(() => {
    setHasError(false)
    setIsLoading(true)
  }, [video.src])

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    const videoElement = videoRef.current
    if (!videoElement || hasError) return

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play().catch((error) => {
        console.warn(`Gallery video ${index} play failed:`, error)
      })
    }
  }

  const handleVideoClick = () => {
    if (hasError) return
    onVideoClick({
      type: 'video',
      src: video.src,
      alt: video.alt,
      index
    })
  }

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation()
    setHasError(false)
    setIsLoading(true)
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.load()
    }
  }

  const handleLoadedData = () => {
    setHasError(false)
    setIsLoading(false)
    // Auto-play on load
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.play().catch((e) => {
        console.warn(`Auto-play failed for video ${index}:`, e.message)
      })
    }
  }

  const handleError = (e: any) => {
    console.error(`❌ Gallery video ${index} error:`, {
      src: video.src,
      error: e.target?.error,
      networkState: e.target?.networkState,
      readyState: e.target?.readyState
    })
    setHasError(true)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="gallery-video cursor-pointer group relative" onClick={handleVideoClick}>
        <div className="w-full aspect-[9/16] bg-muted rounded-[20px] flex flex-col items-center justify-center p-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-muted-foreground text-sm">Loading video...</p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="gallery-video cursor-pointer group relative" onClick={handleVideoClick}>
        <div className="w-full aspect-[9/16] bg-muted rounded-[20px] flex flex-col items-center justify-center p-4">
          <p className="text-muted-foreground text-center mb-2">Video unavailable</p>
          <p className="text-muted-foreground text-xs text-center opacity-70 mb-3">
            Video {index + 1}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRetry}
            className="text-xs"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery-video cursor-pointer group relative" onClick={handleVideoClick}>
      <video
        ref={videoRef}
        src={video.src}
        className="w-full aspect-[9/16] object-cover rounded-[20px]"
        muted
        loop
        playsInline
        onError={handleError}
        onLoadedData={handleLoadedData}
        onCanPlay={() => setIsLoading(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        Your browser does not support the video tag.
      </video>

      <Button
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass-card"
        size="icon"
        variant="outline"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}

function App() {
  console.log('🎯 App component is rendering!')
  
  const [email, setEmail] = useState('')
  const [heroVideoError, setHeroVideoError] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(-1)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxContent, setLightboxContent] = useState<{
    type: 'image' | 'video'
    src: string
    alt?: string
    index?: number
  } | null>(null)

  const features = [
    {
      title: 'Emotion Journaling',
      subtitle: 'Feelings in a Cozy Corner',
      description: 'Rest your feelings on a little cushion for the day—guided by gentle psychology.'
    },
    {
      title: 'Emotion Tracking',
      subtitle: 'Your Feelings, Gently Mapped',
      description: 'See the soft paths your emotions take, mapped with care and grounded in emotion science.'
    },
    {
      title: 'Gentle Reminders',
      subtitle: 'Little Moments, Big Calm',
      description: 'Even one mindful minute can ease your heart—rooted in simple, proven practices.'
    },
    {
      title: 'Daily Uplifting Words',
      subtitle: 'Tiny Words, Warm Lift',
      description: 'Small, cozy phrases crafted with a touch of positive psychology.'
    }
  ]

  const openLightbox = (content: { type: 'image' | 'video'; src: string; alt?: string; index?: number }) => {
    setLightboxContent(content)
    setLightboxOpen(true)
    setCurrentGalleryIndex(content.index ?? -1)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxContent(null)
    setCurrentGalleryIndex(-1)
  }

  const navigateGallery = (direction: 'next' | 'prev') => {
    if (currentGalleryIndex === -1) return
    const newIndex = direction === 'next' 
      ? (currentGalleryIndex + 1) % galleryVideos.length
      : (currentGalleryIndex - 1 + galleryVideos.length) % galleryVideos.length
    
    const newVideo = galleryVideos[newIndex]
    setLightboxContent({
      type: 'video',
      src: newVideo.src,
      alt: newVideo.alt,
      index: newIndex
    })
    setCurrentGalleryIndex(newIndex)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    // Simulate email signup
    toast.success("Thanks! We'll notify you when Feelis launches.")
    setEmail('')
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft' && currentGalleryIndex !== -1) {
        navigateGallery('prev')
      } else if (e.key === 'ArrowRight' && currentGalleryIndex !== -1) {
        navigateGallery('next')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentGalleryIndex])

  // Auto-pause hero video when out of view
  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            video.pause()
          } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            video.play().catch((error) => {
              console.error('Failed to play hero video:', error)
              setHeroVideoError(true)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [heroVideoError])

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-right" />
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('home')} 
              className="flex items-center gap-3 font-bold text-lg"
            >
              <img 
                src={feelisLogo} 
                alt="Feelis logo" 
                className="w-9 h-9 rounded-xl"
                onError={(e) => {
                  console.warn('Logo failed to load, using fallback')
                  e.currentTarget.style.display = 'none'
                }}
              />
              Feelis
            </button>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('features')} className="font-semibold opacity-85 hover:opacity-100 transition-opacity">
                Features
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="font-semibold opacity-85 hover:opacity-100 transition-opacity">
                How It Works
              </button>
              <button onClick={() => scrollToSection('gallery')} className="font-semibold opacity-85 hover:opacity-100 transition-opacity">
                Gallery
              </button>
              <button onClick={() => scrollToSection('video')} className="font-semibold opacity-85 hover:opacity-100 transition-opacity">
                Video
              </button>
              <Button 
                onClick={() => scrollToSection('download')}
                className="rounded-xl"
              >
                Get the App
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-18 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  A soft place for your feelings.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                A cozy little journaling hug for your heart, guided by Pearll.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('download')}
                  className="rounded-xl bg-accent hover:bg-accent/90"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download (iOS)
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('video')}
                  className="rounded-xl glass-card"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Trailer
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="glass-card px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  No sign-up required
                </span>
                <span className="glass-card px-4 py-2 rounded-full font-semibold">
                  Private by design
                </span>
                <span className="glass-card px-4 py-2 rounded-full font-semibold">
                  Tiny, daily wins
                </span>
              </div>
            </div>

            <div>
              <div className="hero-video-container">
                {heroVideoError ? (
                  <div className="w-full aspect-[9/16] bg-muted rounded-[20px] flex flex-col items-center justify-center p-4">
                    <p className="text-muted-foreground text-center mb-2">Video unavailable</p>
                    <p className="text-muted-foreground text-xs text-center opacity-70 mb-3">
                      Hero video
                    </p>
                    <button 
                      onClick={() => {
                        setHeroVideoError(false)
                        const video = heroVideoRef.current
                        if (video) {
                          video.load()
                        }
                      }}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <video
                    ref={heroVideoRef}
                    src={heroVideo}
                    className="w-full aspect-[9/16] object-cover rounded-[20px]"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onError={(e) => {
                      console.error('Hero video failed to load:', heroVideo)
                      setHeroVideoError(true)
                    }}
                    onLoadedData={() => {
                      setHeroVideoError(false)
                      // Try to auto-play
                      const video = heroVideoRef.current
                      if (video) {
                        video.play().catch(() => {
                          console.warn('Hero video autoplay failed')
                        })
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Designed for gentle progress
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything in Feelis is crafted to help you show up for a minute, not a marathon. Tiny rituals compound into calm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 glass-card border-0">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3 opacity-90">
                  {feature.subtitle}
                </p>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              A world that feels like a hug
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Breathe with Pearll, write down your feelings. Her cozy pastel world is like a warm hug for your heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryVideos.map((video, index) => (
              <GalleryVideo 
                key={index}
                video={video}
                index={index}
                onVideoClick={openLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="device-frame rounded-3xl p-3 shadow-2xl">
              <video
                className="w-full rounded-xl"
                src={heroVideo}
                controls
                playsInline
                poster=""
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                See Feelis in motion
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A short walkthrough of the breathing loop, emotion prompts, and the cozy visual system that makes you want to come back.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => openLightbox({
                    type: 'video',
                    src: heroVideo
                  })}
                  className="rounded-xl"
                >
                  Open in Lightbox
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('features')}
                  className="rounded-xl glass-card"
                >
                  Explore Features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Get Feelis
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Launching soon on the App Store. Add your email and we'll ping you on day one.
          </p>

          <form onSubmit={handleEmailSubmit} className="glass-card p-4 rounded-2xl flex gap-3 items-center mb-6 max-w-md mx-auto">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 border-0 bg-transparent"
              required
            />
            <Button type="submit" className="rounded-xl">
              Notify Me
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="glass-card px-4 py-2 rounded-full font-semibold">
              iPhone & iPad
            </span>
            <span className="glass-card px-4 py-2 rounded-full font-semibold">
              Made in LA
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t glass-card py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 font-bold text-lg mb-4">
                <img 
                  src={feelisLogo} 
                  alt="Feelis logo" 
                  className="w-9 h-9 rounded-xl"
                  onError={(e) => {
                    console.warn('Logo failed to load in footer, using fallback')
                    e.currentTarget.style.display = 'none'
                  }}
                />
                Feelis
              </div>
              <p className="text-muted-foreground mb-4">
                A tiny, lovely ritual for calmer days. Built with intention by BRDY Studios.
              </p>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} BRDY Studios. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('features')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('gallery')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  Gallery
                </button>
                <button onClick={() => scrollToSection('video')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  Video
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2">
                <a href="mailto:hello@brdystudios.com" className="block text-muted-foreground hover:text-foreground transition-colors">
                  hello@brdystudios.com
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
                <a href="https://x.com/" target="_blank" rel="noreferrer" className="block text-muted-foreground hover:text-foreground transition-colors">
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
          <div className="relative">
            <Button
              size="icon"
              variant="outline"
              className="absolute -top-12 -right-12 rounded-full bg-white hover:bg-gray-100 z-10"
              onClick={closeLightbox}
            >
              <X className="w-4 h-4" />
            </Button>

            {currentGalleryIndex !== -1 && (
              <>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white hover:bg-gray-100 z-10"
                  onClick={() => navigateGallery('prev')}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white hover:bg-gray-100 z-10"
                  onClick={() => navigateGallery('next')}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {lightboxContent?.type === 'image' && (
              <img
                src={lightboxContent.src}
                alt={lightboxContent.alt || ''}
                className="max-w-full max-h-[88vh] rounded-2xl"
              />
            )}

            {lightboxContent?.type === 'video' && (
              <video
                src={lightboxContent.src}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="max-w-full max-h-[88vh] rounded-2xl"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App