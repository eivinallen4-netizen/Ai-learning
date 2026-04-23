import Link from 'next/link'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import { ArrowRight, BookOpen, TrendingUp, Users, HelpCircle, CheckCircle2, Zap, Clock, Brain } from 'lucide-react'

export const metadata = {
  title: 'Learn More - AI-Powered Study for Pre-Med, Law, CS',
  description: 'Master your material 3x faster. Unlimited tests, spaced repetition, adaptive AI. Used by 2,400+ students across 200+ universities.',
}

export default function Home() {
  const navLinks = [
    {
      icon: BookOpen,
      title: 'How It Works',
      description: 'Upload material → AI generates tests → Master through spaced repetition',
      href: '/how-it-works',
    },
    {
      icon: TrendingUp,
      title: 'Results',
      description: '+14% grade improvement, 15 hours/week saved, 3x better retention',
      href: '/results',
    },
    {
      icon: Users,
      title: 'Testimonials',
      description: 'Real stories from pre-med, law, and CS students',
      href: '/testimonials',
    },
    {
      icon: HelpCircle,
      title: 'Pricing',
      description: 'Free tier (1 subject) or Premium ($12/mo for unlimited)',
      href: '/pricing',
    },
  ]

  const problems = [
    {
      emoji: '😫',
      title: 'You\'re Memorizing, Not Learning',
      description: 'Rereading textbooks burns hours. Nothing sticks for exams. Then everything is forgotten by next semester.',
    },
    {
      emoji: '⏰',
      title: 'Study Time is Endless',
      description: 'Pre-med students spend 20+ hours/week. Law students cram case briefs. CS majors debug at midnight. Never enough time.',
    },
    {
      emoji: '❌',
      title: 'You Don\'t Know What You Don\'t Know',
      description: 'You study everything equally. But 80% of the exam is probably 20% of the material. Waste on weak guessing.',
    },
  ]

  const features = [
    {
      icon: Brain,
      title: 'AI Generates Unlimited Tests',
      description: 'Paste your notes. Get a practice test in 10 seconds. Every question from your actual material.',
    },
    {
      icon: Zap,
      title: 'Adaptive Learning',
      description: 'AI learns what you struggle with. Next test focuses on your weak spots. You master faster.',
    },
    {
      icon: Clock,
      title: 'Spaced Repetition',
      description: 'The algorithm schedules optimal review times. Science-backed. Beats cramming 10x over.',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'See exactly what you know and what you don\'t. Detailed weak-spot analysis for every test.',
    },
  ]

  const pricing = [
    {
      tier: 'Free',
      price: '$0',
      period: '/month',
      cta: 'Get Started',
      description: 'Perfect for trying it out',
      features: [
        '1 subject',
        '5 tests/month',
        '3 retakes per test',
        'Basic progress tracking',
        'Mobile app access',
      ],
      highlighted: false,
    },
    {
      tier: 'Premium',
      price: '$12',
      period: '/month',
      cta: 'Start Free Trial',
      description: 'For serious students',
      features: [
        'Unlimited subjects',
        'Unlimited tests',
        'Unlimited retakes',
        'Advanced AI optimization',
        'Offline mode',
        'Priority support',
        'Export progress',
      ],
      highlighted: true,
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      school: 'UC San Diego • Pre-Med',
      quote: 'Dropped study time from 20 hours to 8 hours/week. Grade went from 68% to 87% in organic chem.',
      gpa: '3.9 GPA',
    },
    {
      name: 'Marcus Johnson',
      school: 'Columbia Law • 2L',
      quote: 'Instead of passively reading cases, I was actively testing myself. Passed Evidence with honors.',
      gpa: '3.8 GPA',
    },
    {
      name: 'Priya Patel',
      school: 'MIT • Computer Science',
      quote: 'Eliminated the "I thought I knew this" moments. Passed CS fundamentals, systems, and AI courses.',
      gpa: '3.7 GPA',
    },
  ]

  const stats = [
    { number: '2,400+', label: 'Active Students' },
    { number: '+14%', label: 'Avg Grade Improvement' },
    { number: '15 hrs/week', label: 'Time Saved' },
    { number: '3x', label: 'Better Retention' },
  ]

  return (
    <div className='relative overflow-hidden bg-white dark:bg-slate-950'>
      <main className='relative z-10'>
        {/* Hero */}
        <HeroSection />

        {/* Stats Section */}
        <section className='px-6 py-16 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10'>
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              {stats.map((stat, i) => (
                <div key={i} className='text-center'>
                  <div className='text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-gray-600 dark:text-gray-400 font-medium'>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-4xl md:text-5xl font-black text-center mb-4'>Why Most Students Fail</h2>
            <p className='text-center text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16'>
              (And why this fixes it)
            </p>

            <div className='grid md:grid-cols-3 gap-8'>
              {problems.map((problem, i) => (
                <div key={i} className='rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-lg transition-all'>
                  <div className='text-5xl mb-4'>{problem.emoji}</div>
                  <h3 className='text-lg font-bold mb-3 text-gray-900 dark:text-white'>{problem.title}</h3>
                  <p className='text-gray-700 dark:text-gray-400 leading-relaxed'>{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='px-6 py-20 bg-gradient-to-b from-transparent to-blue-50/30 dark:to-blue-900/10'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-4xl md:text-5xl font-black text-center mb-16'>How It Actually Works</h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className='rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-lg transition-all'>
                    <Icon className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-4' />
                    <h3 className='text-lg font-bold mb-2 text-gray-900 dark:text-white'>{feature.title}</h3>
                    <p className='text-gray-700 dark:text-gray-400'>{feature.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Quick How It Works */}
            <div className='max-w-3xl mx-auto'>
              <div className='bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 p-8 md:p-12'>
                <h3 className='text-2xl font-bold mb-8 text-center'>4 Steps to Better Grades</h3>
                <div className='grid md:grid-cols-4 gap-4 md:gap-6'>
                  {[
                    { num: '1', label: 'Upload Notes' },
                    { num: '2', label: 'AI Generates Test' },
                    { num: '3', label: 'Take Test' },
                    { num: '4', label: 'Master Weak Spots' },
                  ].map((step, i) => (
                    <div key={i} className='text-center'>
                      <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold flex items-center justify-center mx-auto mb-3'>
                        {step.num}
                      </div>
                      <p className='font-semibold text-sm'>{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-4xl md:text-5xl font-black text-center mb-6'>Simple Pricing</h2>
            <p className='text-center text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16'>
              Start free. Upgrade only when you need more. No credit card required.
            </p>

            <div className='grid md:grid-cols-2 gap-8 max-w-3xl mx-auto'>
              {pricing.map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-8 transition-all ${
                    plan.highlighted
                      ? 'border-blue-600 bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/20 relative'
                      : 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30'
                  }`}
                >
                  {plan.highlighted && (
                    <div className='absolute -top-4 right-6 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold'>
                      RECOMMENDED
                    </div>
                  )}

                  <h3 className='text-2xl font-bold mb-2'>{plan.tier}</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>{plan.description}</p>

                  <div className='flex items-baseline gap-1 mb-6'>
                    <span className='text-5xl font-black'>{plan.price}</span>
                    <span className='text-gray-600 dark:text-gray-400'>{plan.period}</span>
                  </div>

                  <Link
                    href='/sign-up'
                    className={`block w-full px-6 py-3 rounded-lg font-semibold transition-all mb-8 text-center ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                        : 'border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className='space-y-3'>
                    {plan.features.map((feature, j) => (
                      <li key={j} className='flex items-center gap-2 text-gray-700 dark:text-gray-300'>
                        <CheckCircle2 className='w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='px-6 py-20 bg-gradient-to-b from-transparent to-blue-50/30 dark:to-blue-900/10'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-4xl md:text-5xl font-black text-center mb-4'>Students See Real Results</h2>
            <p className='text-center text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16'>
              From pre-med to law to CS, ambitious students are using this to master their material.
            </p>

            <div className='grid md:grid-cols-3 gap-8'>
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className='rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-lg transition-all bg-white/50 dark:bg-gray-900/50'
                >
                  <p className='text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed'>
                    "{testimonial.quote}"
                  </p>
                  <div className='border-t border-gray-200 dark:border-gray-700 pt-4'>
                    <p className='font-bold text-gray-900 dark:text-white'>{testimonial.name}</p>
                    <p className='text-xs text-gray-600 dark:text-gray-400'>{testimonial.school}</p>
                    <p className='text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1'>{testimonial.gpa}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-3xl'>
            <h2 className='text-4xl md:text-5xl font-black text-center mb-16'>Quick Answers</h2>

            <div className='space-y-6'>
              {[
                {
                  q: 'Do I need a credit card for free?',
                  a: 'No. Free account with just your email. Premium is optional and you can cancel anytime.',
                },
                {
                  q: 'What subjects are available?',
                  a: 'Pre-med (organic chem, biochem, MCAT), law (case law, contracts, evidence), CS (algorithms, systems, databases), and 50+ others.',
                },
                {
                  q: 'How much time does this actually save?',
                  a: 'Average: 15 hours/week. Instead of 4 hours of passive reading, you do 1.5 hours of focused testing.',
                },
                {
                  q: 'Is this better than tutoring?',
                  a: 'Different thing. Tutoring is one-on-one help. This is self-directed practice with AI feedback. Much cheaper. Use together if needed.',
                },
                {
                  q: 'Can I use this for multiple courses?',
                  a: 'Free: 1 course. Premium: unlimited. Perfect for pre-med juggling 4 courses or law students with multiple classes.',
                },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className='font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                    {item.q}
                  </h3>
                  <p className='text-gray-700 dark:text-gray-400 ml-7'>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Links Section */}
        <section className='px-6 py-20 bg-gradient-to-b from-transparent to-blue-50/30 dark:to-blue-900/10'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-3xl font-bold text-center mb-4'>Want More Details?</h2>
            <p className='text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto'>
              Deep dives into how it works, detailed results by field, full testimonials, and comprehensive FAQs.
            </p>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='group rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-all duration-300'
                  >
                    <Icon className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform' />
                    <h3 className='font-bold mb-2 text-gray-900 dark:text-white'>{link.title}</h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>{link.description}</p>
                    <div className='flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-3 transition-all'>
                      Explore
                      <ArrowRight className='w-4 h-4' />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className='px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-4xl md:text-5xl font-black text-white mb-6'>Stop Wasting Time Studying</h2>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
              Students who use this tool drop study time by 60% and boost grades by 14%. Your GPA is waiting.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/sign-up'
                className='px-8 py-4 rounded-lg bg-white text-blue-600 font-bold hover:bg-gray-100 transition-all shadow-lg'
              >
                Create Free Account
              </Link>
              <Link
                href='/sign-up'
                className='px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition-all'
              >
                See All Plans
              </Link>
            </div>
            <p className='text-blue-100 text-sm mt-6'>
              No credit card required. Free tier includes 1 subject, 5 tests/month. Cancel anytime.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
