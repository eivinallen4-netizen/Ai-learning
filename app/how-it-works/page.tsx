'use client'
import Footer from '@/components/Footer'
import { Brain, Zap, Target, Repeat, CheckCircle2, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  const mechanics = [
    {
      icon: Brain,
      title: 'Upload Any Material',
      description: 'Paste notes, upload PDFs, add links. Anything you\'re studying for.',
      detail: 'The AI reads what you give it and understands the key concepts.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'AI Generates Tests',
      description: 'Instant practice questions from your material.',
      detail: 'Not random. Every question is directly answerable from your notes. If you didn\'t upload it, we don\'t test it.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Target,
      title: 'Active Recall Testing',
      description: 'You take the test. This is how your brain actually learns.',
      detail: 'Passive reading = 10% retention. Testing yourself = 60% retention. Science is clear.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Repeat,
      title: 'Unlimited Retakes',
      description: 'Premium: retake any test until you master it.',
      detail: 'Free: 3 retakes. Premium: unlimited. You don\'t move on until you actually know it.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'AI Learns Your Gaps',
      description: 'The algorithm tracks what you struggle with.',
      detail: 'Next tests focus on your weak spots. It\'s like having a tutor who knows exactly what to ask.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: CheckCircle2,
      title: 'Spaced Repetition',
      description: 'Review at optimal intervals for maximum retention.',
      detail: 'We schedule when you should review each concept. This beats cramming by 10x.',
      color: 'from-indigo-500 to-blue-500',
    },
  ]

  const whyItWorks = [
    {
      title: 'Active Recall > Passive Reading',
      description: 'Testing yourself forces your brain to retrieve information. That\'s how memory works. Rereading does nothing.',
    },
    {
      title: 'Spaced Repetition > Cramming',
      description: 'Reviewing material over time = permanent memory. Cramming = temporary short-term memory that fades in days.',
    },
    {
      title: 'Targeted Testing > Random Reviewing',
      description: 'If you struggle with organic reactions, why review the stuff you already know? AI focuses on your actual gaps.',
    },
    {
      title: 'Unlimited Retakes > 3 Attempts',
      description: 'Mastery requires repetition. Free students hit a wall after 3 retakes. Premium students drill until it sticks.',
    },
  ]

  const comparison = [
    {
      scenario: 'Pre-med student learning organic chemistry',
      traditional: [
        '4 hours: read textbook chapter',
        '2 hours: highlight notes (again)',
        '3 hours: do textbook problems',
        'Net result: maybe 60% retention',
        'Time: 9 hours',
      ],
      smarter: [
        '30 min: upload your notes',
        '20 min: take AI-generated test',
        '30 min: retake, focus on weak spots',
        'Net result: 85% retention',
        'Time: 1.5 hours',
      ],
    },
    {
      scenario: 'Law student preparing for evidence exam',
      traditional: [
        '2 hours: brief cases',
        '2 hours: read case briefs again',
        '1.5 hours: make outline',
        '2 hours: reread outline',
        'Net result: can recite rules, can\'t apply',
        'Time: 7.5 hours',
      ],
      smarter: [
        '20 min: paste case notes',
        '30 min: take hypothetical test',
        '20 min: retake, focus on gaps',
        'Net result: can apply rules to new situations',
        'Time: 1.5 hours',
      ],
    },
  ]

  return (
    <div className='relative overflow-hidden bg-white dark:bg-slate-950'>
      <main className='relative z-10'>
        {/* Hero */}
        <section className='px-6 py-20 pt-32 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10'>
          <div className='mx-auto max-w-6xl'>
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-center'>
              Learning science, <span className='text-gradient'>not guesswork</span>
            </h1>
            <p className='text-center text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12'>
              Every feature is based on how the human brain actually learns. Active recall, spaced repetition, adaptive testing. That's it.
            </p>
          </div>
        </section>

        {/* How It Works Flow */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-4xl font-bold text-center mb-16'>6 Steps to Mastery</h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
              {mechanics.map((mechanic, i) => {
                const Icon = mechanic.icon
                return (
                  <div key={i} className='relative'>
                    <div className='rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-lg transition-all h-full'>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mechanic.color} p-2.5 mb-4`}>
                        <Icon className='w-full h-full text-white' />
                      </div>
                      <h3 className='text-lg font-bold mb-2 text-gray-900 dark:text-white'>{mechanic.title}</h3>
                      <p className='text-gray-600 dark:text-gray-400 mb-3 font-medium'>{mechanic.description}</p>
                      <p className='text-sm text-gray-500 dark:text-gray-500'>{mechanic.detail}</p>
                    </div>

                    {i < mechanics.length - 1 && (
                      <div className='hidden lg:block absolute -right-4 top-8 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent' />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className='px-6 py-20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='text-4xl font-bold text-center mb-16'>Why this actually works</h2>

            <div className='space-y-6'>
              {whyItWorks.map((item, i) => (
                <div key={i} className='flex gap-4'>
                  <div className='w-1 bg-gradient-to-b from-blue-600 to-purple-600 flex-shrink-0 rounded-full' />
                  <div>
                    <h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-white'>{item.title}</h3>
                    <p className='text-gray-700 dark:text-gray-300 text-lg'>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-12 p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800'>
              <p className='text-center text-gray-700 dark:text-gray-300'>
                This isn't our opinion. Read: "Make It Stick" by Rohrer & Taylor, "Peak Performance" by Stulberg, or the MCAT study guides. Active recall + spaced repetition is the most proven way to learn.
              </p>
            </div>
          </div>
        </section>

        {/* Real Scenarios */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-4xl font-bold text-center mb-16'>Time saved in real scenarios</h2>

            {comparison.map((comp, i) => (
              <div key={i} className='mb-16 last:mb-0'>
                <h3 className='text-2xl font-bold mb-8 text-center'>{comp.scenario}</h3>

                <div className='grid md:grid-cols-2 gap-8'>
                  <div className='rounded-2xl border border-red-300/50 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 p-8'>
                    <h4 className='font-bold text-red-700 dark:text-red-400 mb-4 uppercase text-sm tracking-wide'>❌ Traditional Approach</h4>
                    <ul className='space-y-2 mb-6'>
                      {comp.traditional.map((step, j) => (
                        <li key={j} className='text-gray-700 dark:text-gray-300'>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className='rounded-2xl border border-green-300/50 dark:border-green-900/30 bg-green-50/30 dark:bg-green-900/10 p-8'>
                    <h4 className='font-bold text-green-700 dark:text-green-400 mb-4 uppercase text-sm tracking-wide'>✓ Smarter Approach</h4>
                    <ul className='space-y-2 mb-6'>
                      {comp.smarter.map((step, j) => (
                        <li key={j} className='text-gray-700 dark:text-gray-300'>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className='text-center mt-6 p-4 rounded-lg bg-blue-50/50 dark:bg-blue-900/20'>
                  <p className='font-bold text-blue-700 dark:text-blue-400 text-lg'>
                    83% less time, 41% better retention
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free vs Premium */}
        <section className='px-6 py-20 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/30'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='text-3xl font-bold text-center mb-12'>Free vs Premium</h2>

            <div className='grid md:grid-cols-2 gap-8'>
              <div className='rounded-2xl border border-gray-300/50 dark:border-gray-700 p-8'>
                <h3 className='text-2xl font-bold mb-6'>Free Tier</h3>
                <div className='space-y-4'>
                  <div>
                    <div className='font-semibold mb-1'>1 subject</div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>Pick one (pre-med, law, CS, biology, etc.)</div>
                  </div>
                  <div>
                    <div className='font-semibold mb-1'>5 tests/month</div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>Enough to try it</div>
                  </div>
                  <div>
                    <div className='font-semibold mb-1'>3 retakes per test</div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>Then you hit a limit</div>
                  </div>
                  <div>
                    <div className='font-semibold mb-1'>Basic progress tracking</div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>See what you struggled with</div>
                  </div>
                </div>
              </div>

              <div className='rounded-2xl border-2 border-blue-600 dark:border-blue-400 bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/20 p-8'>
                <div className='absolute -top-4 right-6 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold'>RECOMMENDED</div>
                <h3 className='text-2xl font-bold mb-6'>Premium ($12/mo)</h3>
                <div className='space-y-4'>
                  <div>
                    <div className='font-semibold mb-1 text-blue-600 dark:text-blue-400'>Unlimited subjects</div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>Pre-med: all your courses. Law: all your courses. CS: all your courses.</div>
                  </div>
                  <div>
                    <div className='font-semibold mb-1 text-blue-600 dark:text-blue-400'>Unlimited tests</div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>Generate as many as you want</div>
                  </div>
                  <div>
                    <div className='font-semibold mb-1 text-blue-600 dark:text-blue-400'>Unlimited retakes</div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>Master = no limits</div>
                  </div>
                  <div>
                    <div className='font-semibold mb-1 text-blue-600 dark:text-blue-400'>Advanced AI optimization</div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>Algorithm knows your weak spots after first test</div>
                  </div>
                  <div>
                    <div className='font-semibold mb-1 text-blue-600 dark:text-blue-400'>Offline mode</div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>Download tests for airplane study</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-4xl font-bold mb-6'>Ready to study smarter?</h2>
            <p className='text-xl text-gray-600 dark:text-gray-400 mb-8'>
              Start free. See for yourself. No credit card, no waiting, no BS.
            </p>
            <a href='/get-started' className='inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg'>
              Create Free Account
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
