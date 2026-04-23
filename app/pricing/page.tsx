'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { CheckCircle2, Zap } from 'lucide-react'

export default function Pricing() {
  const freeFeatures = [
    '1 subject curriculum',
    '5 AI-generated tests/month',
    '3 test retakes',
    'Basic progress tracking',
    'Mobile app access',
    'Email support',
  ]

  const premiumFeatures = [
    'Unlimited subjects (pre-med, law, CS, biology, chemistry, etc.)',
    'Unlimited AI-generated tests',
    'Unlimited test retakes',
    'Advanced spaced-repetition optimization',
    'Detailed weak-spot analysis',
    'Offline mode',
    'Priority support',
    'Export progress reports',
    'Study group collaboration tools',
    'Custom curriculum builder',
  ]

  const whySubscribe = [
    {
      title: 'Master Multiple Fields',
      description: 'Organic chemistry AND biochemistry AND MCAT prep. All in one place. Pre-med students need breadth.',
    },
    {
      title: 'Unlimited Retakes = Unlimited Learning',
      description: 'Free tier locks you after 3 retakes. That\'s not enough for mastery. Premium lets you drill until it sticks.',
    },
    {
      title: 'Actual Test Generation',
      description: 'Free tests are sampled. Premium generates tests on-demand matching your exact weak spots.',
    },
    {
      title: 'Study Hours → Minutes',
      description: 'Pre-med student spending 4 hours studying? Cut that to 1.5 hours with AI-optimized testing.',
    },
  ]

  return (
    <div className='relative overflow-hidden bg-white dark:bg-slate-950'>
      <main className='relative z-10'>
        {/* Hero */}
        <section className='relative px-6 py-24 pt-32 overflow-hidden'>
          <div className='mx-auto max-w-6xl'>
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-center'>
              Pricing that scales with <span className='text-gradient'>your ambition</span>
            </h1>
            <p className='text-center text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16'>
              Start free. Upgrade when you need more. No surprise charges. Cancel anytime.
            </p>

            {/* Pricing Cards */}
            <div className='grid md:grid-cols-2 gap-8 mb-20'>
              {/* Free Tier */}
              <div className='rounded-2xl border border-gray-200 dark:border-gray-800 p-8 bg-gray-50/50 dark:bg-gray-900/30'>
                <div className='mb-8'>
                  <h3 className='text-2xl font-bold mb-2'>Free</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>Perfect for trying us out</p>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-4xl font-black'>$0</span>
                    <span className='text-gray-600 dark:text-gray-400'>/month</span>
                  </div>
                </div>

                <Link href='/get-started' className='w-full inline-block text-center px-6 py-3 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold transition-colors mb-8'>
                  Get Started
                </Link>

                <div className='space-y-4'>
                  {freeFeatures.map((feature, i) => (
                    <div key={i} className='flex items-start gap-3'>
                      <CheckCircle2 className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
                      <span className='text-gray-700 dark:text-gray-300'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Tier */}
              <div className='rounded-2xl border-2 border-blue-600 p-8 bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/20 relative'>
                <div className='absolute -top-4 right-8 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold'>
                  Most Popular
                </div>

                <div className='mb-8'>
                  <h3 className='text-2xl font-bold mb-2'>Premium</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>For serious students</p>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-4xl font-black'>$12</span>
                    <span className='text-gray-600 dark:text-gray-400'>/month</span>
                  </div>
                  <p className='text-xs text-gray-600 dark:text-gray-400 mt-2'>Billed monthly. Cancel anytime.</p>
                </div>

                <button className='w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold transition-all shadow-lg hover:shadow-xl mb-8'>
                  Start Free Trial
                </button>

                <div className='space-y-4'>
                  {premiumFeatures.map((feature, i) => (
                    <div key={i} className='flex items-start gap-3'>
                      <CheckCircle2 className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                      <span className='text-gray-700 dark:text-gray-300 font-medium'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why Subscribe Section */}
            <div className='border-t border-gray-200 dark:border-gray-800 pt-20'>
              <h2 className='text-4xl font-bold mb-16 text-center'>Why upgrade to Premium?</h2>

              <div className='grid md:grid-cols-2 gap-12'>
                {whySubscribe.map((item, i) => (
                  <div key={i} className='flex gap-6'>
                    <Zap className='w-8 h-8 text-blue-600 flex-shrink-0' />
                    <div>
                      <h3 className='text-lg font-bold mb-2'>{item.title}</h3>
                      <p className='text-gray-700 dark:text-gray-400'>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className='border-t border-gray-200 dark:border-gray-800 mt-20 pt-20'>
              <h2 className='text-3xl font-bold mb-12 text-center'>Common questions</h2>

              <div className='max-w-3xl mx-auto space-y-8'>
                <div>
                  <h3 className='text-lg font-bold mb-2'>Can I switch between Free and Premium?</h3>
                  <p className='text-gray-700 dark:text-gray-400'>Yes. Upgrade or downgrade anytime with one click. Your study progress carries over.</p>
                </div>

                <div>
                  <h3 className='text-lg font-bold mb-2'>What happens if I cancel?</h3>
                  <p className='text-gray-700 dark:text-gray-400'>You lose premium features but keep all your study data. You can resubscribe anytime.</p>
                </div>

                <div>
                  <h3 className='text-lg font-bold mb-2'>Is there a student discount?</h3>
                  <p className='text-gray-700 dark:text-gray-400'>Yes. .edu email gets 30% off Premium. Add your school email during signup.</p>
                </div>

                <div>
                  <h3 className='text-lg font-bold mb-2'>Can I share my account?</h3>
                  <p className='text-gray-700 dark:text-gray-400'>Each account is for one student. We track individual learning profiles so sharing breaks the AI adaptation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
