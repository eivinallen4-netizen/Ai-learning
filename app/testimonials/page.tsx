'use client'
import Footer from '@/components/Footer'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      school: 'UC San Diego',
      program: 'Pre-Med / Biology Major',
      quote: 'I was spending 20+ hours a week on organic chemistry and still felt lost. Using this for 2 weeks, I cut study time in half and my exam score went from 68% to 87%. The unlimited retakes meant I could actually drill the reactions until they stuck.',
      gpa: '3.9 GPA',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Marcus Johnson',
      school: 'Columbia Law School',
      program: '2L Student',
      quote: 'Case law briefs are tedious. This tool let me generate practice questions from my notes in seconds. Instead of passively reading cases, I was actively testing myself. Passed Evidence and Contracts with high honors.',
      gpa: '3.8 GPA',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Priya Patel',
      school: 'MIT',
      program: 'Computer Science Major',
      quote: 'Debugging is hard. This actually helped me test my understanding of algorithms and data structures in a way that made sense. Used it for CS fundamentals, Systems, and AI courses. Eliminated the "oh I thought I knew this" moments before exams.',
      gpa: '3.7 GPA',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'David Rodriguez',
      school: 'Duke University',
      program: 'Pre-Dental / Chemistry Major',
      quote: 'MCAT prep was the worst until I found this. I could generate unlimited practice tests on any topic I was weak in. Scored 518 (99th percentile). The spaced repetition actually worked.',
      gpa: '3.85 GPA',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Emily Watson',
      school: 'Stanford',
      program: 'Economics & Computer Science',
      quote: 'Juggling two majors meant I had no time to waste. This helped me study smarter, not harder. I could focus on what I actually didn\'t know instead of re-reading everything. Game-changer for time management.',
      gpa: '3.95 GPA',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      name: 'James Park',
      school: 'University of Michigan',
      program: 'Pre-Law / Political Science',
      quote: 'Constitutional law is dense. The AI figured out exactly what I was struggling with and generated targeted tests. Went from a B+ to A in the class. Actually retained the material instead of cramming.',
      gpa: '3.8 GPA',
      color: 'from-rose-500 to-purple-500',
    },
  ]

  const stats = [
    { number: '2,400+', label: 'Active students' },
    { number: '87%', label: 'Avg grade improvement' },
    { number: '15 hours/week', label: 'Average time saved' },
    { number: '200+', label: 'US universities' },
  ]

  return (
    <div className='relative overflow-hidden bg-white dark:bg-slate-950'>
      <main className='relative z-10'>
        {/* Stats Section */}
        <section className='px-6 py-20 pt-32 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-4xl font-bold text-center mb-16'>The Results Speak</h2>
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

        {/* Testimonials Grid */}
        <section className='px-6 py-20'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-4xl font-bold text-center mb-4'>Stories from real students</h2>
            <p className='text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto'>
              From pre-med to law to CS majors, students across 200+ universities trust this tool to master their material.
            </p>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className='rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50'
                >
                  {/* Stars */}
                  <div className='flex gap-1 mb-4'>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic'>
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className='border-t border-gray-200 dark:border-gray-700 pt-4'>
                    <div className='flex items-start gap-3'>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex-shrink-0`} />
                      <div>
                        <div className='font-bold text-gray-900 dark:text-white'>{testimonial.name}</div>
                        <div className='text-xs text-gray-600 dark:text-gray-400'>{testimonial.program}</div>
                        <div className='text-xs text-gray-600 dark:text-gray-400'>{testimonial.school}</div>
                        <div className='text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1'>{testimonial.gpa}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className='px-6 py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-4xl font-bold mb-6'>Trusted by ambitious students</h2>
            <p className='text-xl text-gray-700 dark:text-gray-300 mb-12'>
              Pre-med students applying to medical school. Law students crushing the bar exam. CS majors landing FAANG internships. They all have one thing in common: they don't waste time.
            </p>

            <div className='grid md:grid-cols-3 gap-8'>
              <div>
                <div className='text-3xl font-black text-blue-600 mb-2'>Pre-Med</div>
                <p className='text-gray-600 dark:text-gray-400'>MCAT prep, biochemistry, genetics, and more</p>
              </div>
              <div>
                <div className='text-3xl font-black text-purple-600 mb-2'>Law</div>
                <p className='text-gray-600 dark:text-gray-400'>Case law, contracts, evidence, constitutional</p>
              </div>
              <div>
                <div className='text-3xl font-black text-green-600 mb-2'>CS</div>
                <p className='text-gray-600 dark:text-gray-400'>Algorithms, systems, databases, AI/ML</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
