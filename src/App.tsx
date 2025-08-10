import { useState, useEffect, useRef } from 'react'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'
import { Dialog, DialogContent } from './components/ui/dialog'
import { Play, X, Download, ArrowRight, ArrowLeft, Pause, Moon, Sun } from '@phosphor-icons/react'
import { cn } from './lib/utils'
import { toast, Toaster } from 'sonner'


// Import static assets with fallback handling
const feelisLogo = new URL('./assets/images/feelis_logo.png', import.meta.url).href

// Screenshot images
const ss01 = new URL('./assets/images/ss01.jpeg', import.meta.url).href
const ss02 = new URL('./assets/images/ss02.jpeg', import.meta.url).href
const ss03 = new URL('./assets/images/ss03.jpeg', import.meta.url).href
const ss04 = new URL('./assets/images/ss04.jpeg', import.meta.url).href
const ss05 = new URL('./assets/images/ss05.jpeg', import.meta.url).href
const ss06 = new URL('./assets/images/ss06.jpeg', import.meta.url).href
const ss07 = new URL('./assets/images/ss07.jpeg', import.meta.url).href
const ss08 = new URL('./assets/images/ss08.jpeg', import.meta.url).href
const ss09 = new URL('./assets/images/ss09.jpeg', import.meta.url).href

const screenshots = [ss01, ss02, ss03, ss04, ss05, ss06]

// Video paths - using Vite's import format
import heroVideo from './assets/videos/emoly_intro_trim.mp4'
import webAngry from './assets/videos/web_Animation_background_angry.mp4'
import webAnxious from './assets/videos/web_Animation_background_anxious.mp4'
import webCalm from './assets/videos/web_Animation_background_calm.mp4'
import webEmpty from './assets/videos/web_Animation_background_empty.mp4'
import webExcited from './assets/videos/web_Animation_background_excited.mp4'
import webGrateful from './assets/videos/web_Animation_background_grateful.mp4'
import webHappy from './assets/videos/web_Animation_background_happy.mp4'
import webSad from './assets/videos/web_Animation_background_sad.mp4'
import webTired from './assets/videos/web_Animation_background_tired.mp4'

// Gallery videos array
const galleryVideos = [
  { 
    src: webExcited, 
    alt: 'Excited emotion background animation',
    emotion: 'Excited',
    description: 'When joy bubbles up from within'
  },
  { 
    src: webHappy, 
    alt: 'Happy emotion background animation',
    emotion: 'Happy',
    description: 'Finding moments of pure joy'
  },
  { 
    src: webGrateful, 
    alt: 'Grateful emotion background animation',
    emotion: 'Grateful',
    description: 'Appreciating life\'s simple gifts'
  },
  { 
    src: webCalm, 
    alt: 'Calm emotion background animation',
    emotion: 'Calm',
    description: 'Finding peace in the present moment'
  },
  { 
    src: webAnxious, 
    alt: 'Anxious emotion background animation',
    emotion: 'Anxious',
    description: 'When worry takes over your mind'
  },
  { 
    src: webTired, 
    alt: 'Tired emotion background animation',
    emotion: 'Tired',
    description: 'When your energy feels drained'
  },
  { 
    src: webAngry, 
    alt: 'Angry emotion background animation',
    emotion: 'Angry',
    description: 'When frustration builds up inside'
  },
  { 
    src: webSad, 
    alt: 'Sad emotion background animation',
    emotion: 'Sad',
    description: 'When your heart feels heavy'
  },
  { 
    src: webEmpty, 
    alt: 'Empty emotion background animation',
    emotion: 'Empty',
    description: 'When you feel disconnected'
  }
]

interface GalleryVideoProps {
  video: { src: string; alt: string; emotion: string; description: string }
  index: number
  onVideoClick: (content: any) => void
}

function GalleryVideo({ video, index, onVideoClick }: GalleryVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play().catch((error) => {
        console.warn(`Gallery video ${index} play failed:`, error)
      })
    }
  }

  const handleVideoClick = () => {
    onVideoClick({
      type: 'video',
      src: video.src,
      alt: video.alt,
      index
    })
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
        autoPlay
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

      {/* Emotion Label */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 text-white">
          <h3 className="font-bold text-lg mb-1">{video.emotion}</h3>
          <p className="text-sm opacity-90">{video.description}</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  console.log('🎯 App component is rendering!')
  
  const [email, setEmail] = useState('')
  const [heroVideoError, setHeroVideoError] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
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
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[oklch(0.12_0.01_85)]' : 'bg-[oklch(0.995_0.002_85)]'}`}>
      <Toaster richColors position="top-right" />
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('home')} 
              className="flex items-center gap-3 font-bold text-lg hover:opacity-80 transition-opacity"
            >
              <img 
                src={feelisLogo} 
                alt="Feelis logo" 
                className="w-8 h-8 rounded-lg object-cover"
                onError={(e) => {
                  console.warn('Logo failed to load, using fallback')
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                Feelis
              </span>
            </button>
            
            <div className="flex items-center gap-3">
              <Button 
                onClick={toggleDarkMode}
                variant="outline"
                size="sm"
                className="rounded-xl glass-card hover:scale-105 hover:shadow-lg transition-all duration-200 ease-out"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
              <Button 
                onClick={() => toast.info("Coming Soon! 🚀", { duration: 3000 })}
                className="rounded-xl bg-gradient-to-r from-emerald-300 to-teal-300 hover:from-emerald-400 hover:to-teal-400 hover:scale-105 hover:shadow-lg active:scale-95 transform transition-all duration-200 ease-out text-white border-0 text-sm md:text-base px-3 md:px-4 py-2"
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
              <div className="flex justify-center mb-12">
                {!imagesLoaded && (
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-100 animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-emerald-200 to-teal-200 animate-pulse"></div>
                  </div>
                )}
                <img 
                  src={feelisLogo} 
                  alt="Feelis logo" 
                  className={`w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImagesLoaded(true)}
                  onError={(e) => {
                    console.warn('Logo failed to load, using fallback')
                    e.currentTarget.style.display = 'none'
                    setImagesLoaded(true)
                  }}
                />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-center">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                  A soft place for your feelings.
                </span>
              </h1>
              <p className={`text-lg md:text-xl mb-8 leading-relaxed text-center transition-colors duration-300 ${isDarkMode ? 'text-[oklch(0.9_0.01_85)]' : 'text-muted-foreground'}`}>
                A cozy little journaling hug for your heart, guided by Pearll
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => toast.info("Coming Soon! 🚀", { duration: 3000 })}
                  className="rounded-xl bg-gradient-to-r from-emerald-300 to-teal-300 hover:from-emerald-400 hover:to-teal-400 hover:scale-105 hover:shadow-lg active:scale-95 transform transition-all duration-200 ease-out text-white border-0"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download (iOS)
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('video')}
                  className="rounded-xl glass-card hover:scale-105 hover:shadow-lg hover:bg-white/10 active:scale-95 transform transition-all duration-200 ease-out"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Trailer
                </Button>
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
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                Designed for gentle progress
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything in Feelis is crafted to help you show up for a minute, not a marathon. Tiny rituals compound into calm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 glass-card border-0 group cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-white/5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm font-semibold text-muted-foreground mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.subtitle}
                </p>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Your Daily Moment of Peace Section - New */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                Your Daily Moment of Peace
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Feelis is designed to be a simple, gentle, and beautiful flow.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
                  Step 01
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-center">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                  Check In With Yourself
                </span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Start by choosing the feeling that best represents your moment. Our beautiful, expressive characters make it easy to identify and acknowledge your emotions.
              </p>
            </div>

            {/* Right Column - Mobile App Screenshots */}
            <div className="relative">
              <div className="flex gap-6 justify-center">
                {/* Left Phone - ss03.jpeg */}
                <img
                  src={ss03}
                  alt="Feelis emotion selection screen"
                  className="w-64 md:w-80 aspect-[9/19.5] rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer object-cover"
                />

                {/* Right Phone - ss02.jpeg */}
                <img
                  src={ss02}
                  alt="Feelis journaling environment screen"
                  className="w-64 md:w-80 aspect-[9/19.5] rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 02: Reflect in a Cozy Space Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
                  Step 02
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-center">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                  Reflect in a Cozy Space
                </span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Write as much or as little as you want. Our thoughtful, context-aware prompts help guide your reflection in a calm, pressure-free environment that adapts to your mood.
              </p>
            </div>

            {/* Right Column - Mobile App Screenshots */}
            <div className="relative">
              <div className="flex gap-6 justify-center">
                {/* Left Phone - ss01.jpeg */}
                <img
                  src={ss01}
                  alt="Feelis journaling screen 1"
                  className="w-64 md:w-80 aspect-[9/19.5] rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer object-cover"
                />

                {/* Right Phone - ss05.jpeg */}
                <img
                  src={ss05}
                  alt="Feelis journaling screen 2"
                  className="w-64 md:w-80 aspect-[9/19.5] rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 03: Discover Your Patterns Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
                  Step 03
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-center">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                  Discover Your Patterns
                </span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See your emotional world unfold through simple, beautiful charts. Understand your most frequent feelings and discover gentle insights over time.
              </p>
            </div>

            {/* Right Column - Mobile App Screenshots */}
            <div className="relative">
              <div className="flex gap-6 justify-center">
                {/* Left Phone - ss06.jpeg */}
                <img
                  src={ss06}
                  alt="Feelis insights screen 1"
                  className="w-64 md:w-80 aspect-[9/19.5] rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer object-cover"
                />

                {/* Right Phone - ss07.jpeg */}
                <img
                  src={ss07}
                  alt="Feelis insights screen 2"
                  className="w-64 md:w-80 aspect-[9/19.5] rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 04: Find a Moment of Calm Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
                  Step 04
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-center">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                  Find a Moment of Calm
                </span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Start or end your day with a thoughtful quote presented in a serene, interactive world. Personalize the scene to match your vibe and find a quiet, beautiful space for a moment of reflection.
              </p>
            </div>

            {/* Right Column - Mobile App Screenshots */}
            <div className="relative">
              <div className="flex gap-6 justify-center">
                {/* Left Phone - ss08.jpeg */}
                <img
                  src={ss08}
                  alt="Feelis calm screen 1"
                  className="w-64 md:w-80 aspect-[9/19.5] rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer object-cover"
                />

                {/* Right Phone - ss09.jpeg */}
                <img
                  src={ss09}
                  alt="Feelis calm screen 2"
                  className="w-64 md:w-80 aspect-[9/19.5] rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                A world that feels like a hug
              </span>
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
                          <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                See Feelis in motion
              </span>
            </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A short walkthrough of the breathing loop, emotion prompts, and the cozy visual system that makes you want to come back.
              </p>
              

            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Get Feelis
            </span>
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
            <Button type="submit" className="rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
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
                <button onClick={() => scrollToSection('daily-moment')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  Daily Moment
                </button>
                <button onClick={() => scrollToSection('screenshots')} className="block text-muted-foreground hover:text-foreground transition-colors">
                  Screenshots
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