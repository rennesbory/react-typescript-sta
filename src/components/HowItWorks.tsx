import { Card } from '@/components/ui/card'

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Breathe with Pearll',
      description: 'Start with a gentle breathing exercise guided by Pearll, our calming companion.'
    },
    {
      number: '02',
      title: 'Write your feelings',
      description: 'Express your emotions in a safe, private space with gentle prompts.'
    },
    {
      number: '03',
      title: 'See your patterns',
      description: 'Discover insights about your emotional journey over time.'
    },
    {
      number: '04',
      title: 'Build tiny habits',
      description: 'Create lasting calm through small, daily moments of mindfulness.'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Four simple steps to a calmer heart. Each designed to take just a minute of your day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 glass-card border-0 text-center">
              <div className="text-4xl font-bold text-primary mb-4 opacity-60">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
