import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, MusicNote } from '@phosphor-icons/react'

export function HowItWorks() {
  const emotions = [
    { name: 'Excited', color: 'bg-yellow-200' },
    { name: 'Happy', color: 'bg-green-200' },
    { name: 'Grateful', color: 'bg-blue-200' },
    { name: 'Calm', color: 'bg-teal-200' },
    { name: 'Anxious', color: 'bg-orange-200' },
    { name: 'Tired', color: 'bg-purple-200' },
    { name: 'Angry', color: 'bg-red-200' },
    { name: 'Sad', color: 'bg-indigo-200' },
    { name: 'Empty', color: 'bg-gray-200' }
  ]

  // Screenshot images for each step (2 per step)
  const stepImages = {
    step1: ['/src/assets/images/ss01.jpeg', '/src/assets/images/ss02.jpeg'],
    step2: ['/src/assets/images/ss03.jpeg', '/src/assets/images/ss04.jpeg'],
    step3: ['/src/assets/images/ss05.jpeg', '/src/assets/images/ss06.jpeg'],
    step4: ['/src/assets/images/ss07.jpeg', '/src/assets/images/ss08.jpeg']
  }

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            How it works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Four simple steps to a calmer heart. Each designed to take just a minute of your day.
          </p>
        </div>

        {/* Step 01: Check In With Yourself */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
              Step 01
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">Check In With Yourself</h3>
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Start by choosing the feeling that best represents your moment. Our beautiful, expressive characters make it easy to identify and acknowledge your emotions.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Emotional Characters Grid */}
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {emotions.map((emotion, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`w-20 h-20 ${emotion.color} rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                        <span className="text-2xl">😊</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{emotion.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 01 Screenshots */}
            <div className="grid grid-cols-2 gap-4">
              {stepImages.step1.map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={image}
                    alt={`Step 01 screenshot ${index + 1}`}
                    className="w-full aspect-[9/16] object-cover rounded-[20px] shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[20px] flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="outline" className="glass-card">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 02: Reflect in a Cozy Space */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
              Step 02
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">Reflect in a Cozy Space</h3>
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Write your feelings in a safe, private space with gentle prompts that guide you through your emotional journey.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-3">Gentle Prompts</h4>
                <p className="text-muted-foreground mb-4">
                  Pearll guides you with thoughtful questions that help you explore your emotions without judgment.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">"What's on your heart today?"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">"How can you be kinder to yourself?"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">"What made you smile today?"</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 02 Screenshots */}
            <div className="grid grid-cols-2 gap-4">
              {stepImages.step2.map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={image}
                    alt={`Step 02 screenshot ${index + 1}`}
                    className="w-full aspect-[9/16] object-cover rounded-[20px] shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[20px] flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="outline" className="glass-card">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 03: See Your Patterns */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
              Step 03
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">See Your Patterns</h3>
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Discover insights about your emotional journey over time with beautiful visualizations that help you understand your patterns.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-3">Emotional Insights</h4>
                <p className="text-muted-foreground mb-4">
                  Track your mood patterns and celebrate your progress with gentle, encouraging insights.
                </p>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${i % 3 === 0 ? 'bg-green-200' : i % 3 === 1 ? 'bg-blue-200' : 'bg-yellow-200'}`}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 03 Screenshots */}
            <div className="grid grid-cols-2 gap-4">
              {stepImages.step3.map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={image}
                    alt={`Step 03 screenshot ${index + 1}`}
                    className="w-full aspect-[9/16] object-cover rounded-[20px] shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[20px] flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="outline" className="glass-card">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 04: Build Tiny Habits */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
              Step 04
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">Build Tiny Habits</h3>
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Create lasting calm through small, daily moments of mindfulness that compound into meaningful change.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-3">Daily Rituals</h4>
                <p className="text-muted-foreground mb-4">
                  Simple practices that fit into your day, designed to build lasting emotional wellness.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm">🌅</span>
                    </div>
                    <span className="text-sm">Morning check-in (2 minutes)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm">📝</span>
                    </div>
                    <span className="text-sm">Evening reflection (3 minutes)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm">🎯</span>
                    </div>
                    <span className="text-sm">Weekly insights (5 minutes)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 04 Screenshots */}
            <div className="grid grid-cols-2 gap-4">
              {stepImages.step4.map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={image}
                    alt={`Step 04 screenshot ${index + 1}`}
                    className="w-full aspect-[9/16] object-cover rounded-[20px] shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[20px] flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="outline" className="glass-card">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
