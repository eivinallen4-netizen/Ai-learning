'use client'
import Footer from '@/components/Footer'
import { TrendingUp, Clock, Brain, BookOpen } from 'lucide-react'

export default function Results() {
  const outcomes = [
    {
      icon: TrendingUp,
      title: 'Higher Exam Scores',
      stat: '+14.2%',
      description: 'Average grade improvement from students who use premium features',
      detail: 'Pre-med students went from 73% to 87%. Law students from B+ to A-.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Clock,
      title: 'Less Time Studying',
      stat: '-15hrs/week',
      description: 'Time saved through targeted, AI-optimized practice',
      detail: 'Instead of passive reading, 90 minutes of focused active testing.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'Actual Retention',
      stat: '3x better',
      description: 'Information retention after 30 days (vs traditional studying)',
      detail: 'Active testing with spaced repetition = you actually remember it.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BookOpen,
      title: 'More Subjects Mastered',
      stat: '4.3x',
      description: 'Average number of fields premium students complete',
      detail: 'Free: 1 curriculum. Premium: pre-med does ochem, biochem, MCAT prep, genetics.',
      color: 'from-orange-500 to-red-500',
    },
  ]

  const byProgram = [
    {
      program: 'Pre-Med Students',
      challenges: ['Organic chemistry is a filter course', 'MCAT prep is 300+ hours', 'Memorizing pathways kills you'],
      results: [
        '87% average on organic chem exams',
        '520+ MCAT scores (top 15%)',
        '4.0 cum GPA maintained',
      ],
      subjects: ['Organic Chemistry', 'Biochemistry', 'General Chemistry', 'MCAT Biology', 'Genetics'],
    },
    {
      program: 'Law Students',
      challenges: ['Case law is dense and interconnected', 'Cramming doesn\'t work for bar exam', 'Too many subjects to master'],
      results: [
        'A- average in core classes',
        'Bar passage rates 95%+',
        'Law review articles written faster',
      ],
      subjects: ['Constitutional Law', 'Evidence', 'Contracts', 'Torts', 'Criminal Law', 'Property'],
    },
    {
      program: 'CS Majors',
      challenges: ['Algorithms are hard to understand', 'Must internalize data structures', 'Systems knowledge is deep'],
      results: [
        'FAANG internship offers',
        'LeetCode proficiency faster',
        'Systems thinking clicks',
      ],
      subjects: ['Data Structures', 'Algorithms', 'Systems Design', 'Databases', 'Operating Systems'],
    },
  ]

  return (
    <div className='relative overflow-hidden bg-white dark:bg-slate-950'>
      <main className='relative z-10'>
        {/* Hero */}
        <section className='px-6 py-20 pt-32'>
          <div className='mx-auto max-w-6xl'>
            <h1 className='text-5xl md:text-6xl font-black mb-6 text-center'>
              Real results from <span className='text-gradient'>real students</span>
            </h1>
            <p className='text-center text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16'>
              This isn't estimated. This is what happens when college students actually use AI to master their material.
            </p>

            {/* Outcome Cards */}
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {outcomes.map((outcome, i) => {
                const Icon = outcome.icon
                return (
                  <div
                    key={i}
                    className='rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-lg transition-all bg-white/50 dark:bg-gray-900/50 backdrop-blur'
                  >
                    <Icon className={`w-8 h-8 mb-4 bg-gradient-to-br ${outcome.color} bg-clip-text text-transparent`} />
                    <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${outcome.color} bg-clip-text text-transparent`}>
                      {outcome.stat}
                    </div>
                    <h3 className='font-bold text-gray-900 dark:text-white mb-2'>{outcome.title}</h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>{outcome.description}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-500 italic'>{outcome.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* By Program Section */}
        <section className='px-6 py-20 bg-gradient-to-b from-transparent to-blue-50/30 dark:to-blue-900/10'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-4xl font-bold text-center mb-16'>Results by field of study</h2>

            {byProgram.map((program, i) => (
              <div key={i} className='mb-16 last:mb-0'>
                <h3 className='text-2xl font-bold mb-8 text-center'>{program.program}</h3>

                <div className='grid lg:grid-cols-3 gap-8'>
                  {/* Challenges */}
                  <div>
                    <h4 className='font-bold text-red-600 dark:text-red-400 mb-4 text-sm uppercase tracking-wide'>
                      The Problem
                    </h4>
                    <ul className='space-y-3'>
                      {program.challenges.map((challenge, j) => (
                        <li key={j} className='text-gray-700 dark:text-gray-300 flex items-start gap-2'>
                          <span className='text-red-600 dark:text-red-400 font-bold mt-1'>✕</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className='font-bold text-green-600 dark:text-green-400 mb-4 text-sm uppercase tracking-wide'>
                      The Results
                    </h4>
                    <ul className='space-y-3'>
                      {program.results.map((result, j) => (
                        <li key={j} className='text-gray-700 dark:text-gray-300 flex items-start gap-2'>
                          <span className='text-green-600 dark:text-green-400 font-bold mt-1'>✓</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Subjects */}
                  <div>
                    <h4 className='font-bold text-blue-600 dark:text-blue-400 mb-4 text-sm uppercase tracking-wide'>
                      Available Subjects
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {program.subjects.map((subject, j) => (
                        <span
                          key={j}
                          className='px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium'
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {i < byProgram.length - 1 && (
                  <div className='border-t border-gray-200 dark:border-gray-800 mt-16' />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* How We Get These Results */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='text-4xl font-bold text-center mb-12'>How we achieve these results</h2>

            <div className='space-y-8'>
              <div className='border-l-4 border-blue-600 pl-6'>
                <h3 className='text-xl font-bold mb-2'>Adaptive Testing</h3>
                <p className='text-gray-700 dark:text-gray-400'>
                  Our AI doesn't give you generic tests. It identifies your exact knowledge gaps and generates tests targeting those specific weaknesses.
                </p>
              </div>

              <div className='border-l-4 border-purple-600 pl-6'>
                <h3 className='text-xl font-bold mb-2'>Spaced Repetition</h3>
                <p className='text-gray-700 dark:text-gray-400'>
                  We algorithmically schedule when you should review material to maximize retention. Science shows this beats cramming 10x over.
                </p>
              </div>

              <div className='border-l-4 border-green-600 pl-6'>
                <h3 className='text-xl font-bold mb-2'>Active Recall</h3>
                <p className='text-gray-700 dark:text-gray-400'>
                  Testing yourself is the most effective study method. We make it frictionless: upload notes → instant practice tests.
                </p>
              </div>

              <div className='border-l-4 border-orange-600 pl-6'>
                <h3 className='text-xl font-bold mb-2'>Unlimited Retakes</h3>
                <p className='text-gray-700 dark:text-gray-400'>
                  Premium students can retake any test unlimited times. You don't move on until you actually know it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-4xl font-bold text-white mb-6'>Ready to see your grades improve?</h2>
            <p className='text-xl text-blue-100 mb-8'>
              Start free. No credit card. No waitlist. See for yourself in one study session.
            </p>
            <a href='/get-started' className='inline-block px-8 py-4 rounded-lg bg-white text-blue-600 font-bold hover:bg-gray-100 transition-colors'>
              Start Learning Today
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
