'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { ResourceInput } from '@/components/ResourceInput'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function GetStarted() {
  const steps = [
    { num: '1', title: 'Upload your material', desc: 'Notes, textbooks, articles, anything' },
    { num: '2', title: 'AI generates a test', desc: 'Instantly based on your content' },
    { num: '3', title: 'Take the test', desc: 'Active recall beats passive reading' },
    { num: '4', title: 'Review weak spots', desc: 'The algorithm knows what you don\'t' },
  ]

  const freeVsPremium = [
    {
      feature: 'Subjects you can study',
      free: '1',
      premium: 'Unlimited (Pre-med, law, CS, biology, etc.)',
    },
    {
      feature: 'Tests per month',
      free: '5',
      premium: 'Unlimited',
    },
    {
      feature: 'Test retakes',
      free: '3',
      premium: 'Unlimited',
    },
    {
      feature: 'AI optimization',
      free: 'Basic',
      premium: 'Advanced (knows your weak spots)',
    },
    {
      feature: 'Study time commitment',
      free: '3-5 hours/week',
      premium: '1-2 hours/week',
    },
  ]

  return (
    <div className='relative overflow-hidden bg-white dark:bg-slate-950'>
      <main className='relative z-10'>
        {/* Hero CTA */}
        <section className='relative px-6 py-20 pt-32 overflow-hidden'>
          <div className='absolute inset-0 -z-10'>
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-transparent rounded-full blur-3xl' />
          </div>

          <div className='mx-auto max-w-4xl'>
            <div className='text-center mb-12'>
              <h1 className='text-5xl md:text-6xl font-black mb-6'>
                <span className='block mb-2'>Your grades are</span>
                <span className='block text-gradient'>one study session away</span>
              </h1>
              <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12'>
                Pre-med struggling in biochemistry. Law student drowning in case law. CS major stuck on algorithms. Stop wasting time. Start this week.
              </p>
            </div>

            {/* Quick Demo Section */}
            <div className='bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 p-8 md:p-12 mb-12'>
              <h2 className='text-2xl font-bold mb-8 text-center'>Try it right now. No signup.</h2>
              <p className='text-center text-gray-600 dark:text-gray-400 mb-8'>
                Paste your notes, an article link, or a textbook excerpt. We'll generate a test in 10 seconds.
              </p>
              <ResourceInput placeholder='Paste your notes, article, or link... or paste "DNA replication" to see a demo' />
            </div>

            {/* How it works */}
            <div className='mb-16'>
              <h2 className='text-3xl font-bold text-center mb-12'>4 steps to better grades</h2>
              <div className='grid md:grid-cols-4 gap-4 md:gap-6'>
                {steps.map((step, i) => (
                  <div key={i} className='text-center'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg'>
                      {step.num}
                    </div>
                    <h3 className='font-bold mb-2'>{step.title}</h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Free vs Premium */}
            <div className='mb-16'>
              <h2 className='text-3xl font-bold text-center mb-12'>Start free, upgrade when you need more</h2>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-gray-200 dark:border-gray-800'>
                      <th className='text-left py-4 px-4 font-bold'>Feature</th>
                      <th className='text-center py-4 px-4 font-bold'>Free</th>
                      <th className='text-center py-4 px-4 font-bold text-blue-600 dark:text-blue-400'>Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {freeVsPremium.map((row, i) => (
                      <tr key={i} className='border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors'>
                        <td className='py-4 px-4 font-medium text-gray-900 dark:text-white'>{row.feature}</td>
                        <td className='py-4 px-4 text-center text-gray-600 dark:text-gray-400'>{row.free}</td>
                        <td className='py-4 px-4 text-center'>
                          <span className='font-semibold text-blue-600 dark:text-blue-400'>{row.premium}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sign up buttons */}
            <div className='text-center mb-16'>
              <h2 className='text-3xl font-bold mb-8'>Ready?</h2>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button className='px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2'>
                  Create Free Account
                  <ArrowRight className='w-5 h-5' />
                </button>
                <Link href='/pricing' className='px-8 py-4 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors'>
                  See Pricing
                </Link>
              </div>
            </div>

            {/* FAQs */}
            <div className='border-t border-gray-200 dark:border-gray-800 pt-16'>
              <h2 className='text-3xl font-bold text-center mb-12'>Quick answers</h2>
              <div className='max-w-3xl mx-auto space-y-8'>
                <div>
                  <h3 className='text-lg font-bold mb-2 flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                    <span>Do I need a credit card for free?</span>
                  </h3>
                  <p className='text-gray-700 dark:text-gray-400 ml-7'>
                    Nope. Free account with your email. Premium is optional.
                  </p>
                </div>

                <div>
                  <h3 className='text-lg font-bold mb-2 flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                    <span>What subjects are available?</span>
                  </h3>
                  <p className='text-gray-700 dark:text-gray-400 ml-7'>
                    Pre-med (organic chem, biochem, MCAT), law (case law, contracts, evidence), CS (algorithms, systems, databases), and 50+ others. You can add any subject.
                  </p>
                </div>

                <div>
                  <h3 className='text-lg font-bold mb-2 flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                    <span>How accurate is the AI?</span>
                  </h3>
                  <p className='text-gray-700 dark:text-gray-400 ml-7'>
                    It generates tests from your actual material, so 99%+ accuracy. It learns your weak spots and tests those more.
                  </p>
                </div>

                <div>
                  <h3 className='text-lg font-bold mb-2 flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                    <span>Can I use offline?</span>
                  </h3>
                  <p className='text-gray-700 dark:text-gray-400 ml-7'>
                    Premium only. Download tests and study anywhere, anytime.
                  </p>
                </div>

                <div>
                  <h3 className='text-lg font-bold mb-2 flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                    <span>What if I don't like it?</span>
                  </h3>
                  <p className='text-gray-700 dark:text-gray-400 ml-7'>
                    Cancel anytime. No lock-in. Premium is month-to-month. Your data stays with you.
                  </p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className='mt-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 p-12 text-center'>
              <h2 className='text-3xl font-bold mb-4'>Stop wasting time</h2>
              <p className='text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
                Students who use this tool drop study time by 60% and boost grades by an average of 14%. Your GPA is waiting.
              </p>
              <button className='px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl'>
                Create Account Now
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
