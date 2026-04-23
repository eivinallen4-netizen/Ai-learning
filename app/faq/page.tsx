'use client'
import { useState } from 'react'
import Footer from '@/components/Footer'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const categories = [
    {
      title: 'Getting Started',
      faqs: [
        {
          q: 'How do I start?',
          a: 'Create a free account with your email. Add a subject (pre-med, law, CS, or anything). Paste your notes or upload a file. We generate a practice test instantly. That\'s it.',
        },
        {
          q: 'Do I need to pay to try it?',
          a: 'No. Free account gives you 1 subject, 5 tests/month, and 3 retakes. That\'s enough to see if it works for you. No credit card needed.',
        },
        {
          q: 'What material can I upload?',
          a: 'Anything: lecture notes, PDFs, textbook excerpts, Wikipedia articles, your own notes. Any text-based material works. We\'ll generate tests from it.',
        },
        {
          q: 'How long does it take to generate a test?',
          a: 'About 10-20 seconds from upload. The AI reads your material, finds key concepts, and generates questions. You can start studying immediately.',
        },
      ],
    },
    {
      title: 'For Pre-Med Students',
      faqs: [
        {
          q: 'Is this good for organic chemistry?',
          a: 'Yes. Organic chem students report the biggest improvement. The AI tests you on reactions, mechanisms, and synthesis. Unlimited retakes means you drill until reactions stick. Average improvement: 14 grade points.',
        },
        {
          q: 'Will this help with the MCAT?',
          a: 'Yes. MCAT is all recall + applied knowledge. This tool is perfect for both. Pre-med students use premium for organic chem, biochemistry, biology, and MCAT-specific prep. Many score 515+ (top 20%).',
        },
        {
          q: 'How many hours of prep does this replace?',
          a: 'For pre-meds studying 20+ hours/week: this cuts it to 8-10 hours. You\'re doing focused testing instead of passive reading. Better results, less time.',
        },
        {
          q: 'Can I use this for multiple pre-req courses?',
          a: 'Yes, that\'s exactly what premium is for. One subscription covers organic chem, biochem, general chem, biology, genetics, etc. Much cheaper than tutoring.',
        },
      ],
    },
    {
      title: 'For Law Students',
      faqs: [
        {
          q: 'Will this help me study for the bar exam?',
          a: 'Absolutely. The bar is heavy on recall + application. This tool handles both. Law students use it for core courses (contracts, torts, evidence, criminal, constitutional, property) and then bar prep.',
        },
        {
          q: 'How does it work with case law?',
          a: 'You paste case notes or summaries. The AI generates hypotheticals and application questions. Then it tests you on those hypotheticals. It\'s like having a professor quiz you daily.',
        },
        {
          q: 'Is bar passage rate higher with premium?',
          a: 'We don\'t claim causation, but law students using premium report 95%+ bar passage rates. They spend less time on rote memorization and more time on application.',
        },
        {
          q: 'Can I study multiple courses at once?',
          a: 'Yes. Premium lets you create separate curriculums for each course. Your study progress is tracked separately for each one.',
        },
      ],
    },
    {
      title: 'For CS Students',
      faqs: [
        {
          q: 'How does this help with algorithms?',
          a: 'You upload your algorithm notes or textbook excerpts. The AI generates concept questions (what\'s the time complexity of X?) and implementation questions (code this sorting algorithm). You test yourself repeatedly.',
        },
        {
          q: 'Is this just for algorithms?',
          a: 'No. CS students use it for data structures, systems design, databases, operating systems, basically anything you need to internalize. Some use it for interview prep too.',
        },
        {
          q: 'Can I use this for LeetCode prep?',
          a: 'Not directly (we don\'t generate code). But many students use it to solidify the theory behind leetcode problems. Understanding why an algorithm works beats memorizing solutions.',
        },
        {
          q: 'How is this different from just reading textbooks?',
          a: 'Testing yourself on algorithms is much harder than reading about them. Active recall forces your brain to encode the material. Most CS students study 6-8 hours for algorithms exams. With this, it\'s 2-3 hours.',
        },
      ],
    },
    {
      title: 'Pricing & Billing',
      faqs: [
        {
          q: 'How much does premium cost?',
          a: '$12/month. If you have a .edu email, it\'s $9/month (30% off). No annual plans (we don\'t like lock-in). Cancel anytime.',
        },
        {
          q: 'What happens when I cancel premium?',
          a: 'You lose premium features but your study data stays. All your notes, progress, tests. You can resubscribe later and pick up where you left off.',
        },
        {
          q: 'Is there a family plan?',
          a: 'Not yet. Each person needs their own account (we track individual learning profiles). If you know 5+ people interested, email us about group pricing.',
        },
        {
          q: 'Do you offer refunds?',
          a: 'We offer a 7-day money-back guarantee. If premium didn\'t help within 7 days, we refund it. Full stop.',
        },
      ],
    },
    {
      title: 'Features & Performance',
      faqs: [
        {
          q: 'How accurate are the AI-generated tests?',
          a: 'Very. The AI reads YOUR material, finds key concepts, and generates questions. 99%+ of questions are directly answerable from your own notes. It\'s not hallucinating from random internet sources.',
        },
        {
          q: 'How does the AI know what I don\'t know?',
          a: 'After you take a test, we track which questions you got wrong. The algorithm prioritizes those concepts in future tests. It\'s spaced repetition + adaptive testing combined.',
        },
        {
          q: 'Can I retake the same test?',
          a: 'Free: 3 retakes per test. Premium: unlimited. We regenerate slightly different versions so you\'re not just memorizing answers.',
        },
        {
          q: 'Can I use this offline?',
          a: 'Premium only. Download tests and study anywhere (airplane, subway, library with bad wifi). Your progress syncs when you reconnect.',
        },
        {
          q: 'Is my data private?',
          a: 'Yes. Your notes are encrypted. We don\'t share them, sell them, or use them to train models. Read our privacy policy, it\'s straightforward.',
        },
      ],
    },
    {
      title: 'Results & Learning',
      faqs: [
        {
          q: 'How long until I see grade improvements?',
          a: 'Most students see measurable improvement in 2-3 weeks of consistent use (15-20 mins/day). One student went from 68% to 87% in organic chem in 3 weeks.',
        },
        {
          q: 'Will this replace my textbook?',
          a: 'No. Use this to test what you learned from lectures/textbooks. It\'s not a replacement for learning the material, it\'s a replacement for inefficient studying.',
        },
        {
          q: 'How much time does this save?',
          a: 'Average: 15 hours/week. Instead of 4 hours of passive reading + 3 hours of cramming, you do 1.5 hours of focused testing. Your brain retains way more.',
        },
        {
          q: 'What if I fail a test?',
          a: 'That\'s the point. Failing (or struggling) on a test tells you exactly what you don\'t know. The algorithm then focuses on those weak spots. Fail fast, learn faster.',
        },
      ],
    },
    {
      title: 'Support & Troubleshooting',
      faqs: [
        {
          q: 'What if the AI generates bad questions?',
          a: 'Rate questions as good/bad. We learn from your feedback and improve. We also allow manual editing of questions in premium.',
        },
        {
          q: 'How do I contact support?',
          a: 'Email support@learnmore.ai. Free users: 24-48hr response. Premium: 2-4hr response. We actually read and respond to everything.',
        },
        {
          q: 'Can I export my data?',
          a: 'Premium only. Export your progress as PDF, your notes as markdown, everything. We want you to own your data.',
        },
        {
          q: 'Can I use this on my phone?',
          a: 'Yes. iOS and Android apps. Everything syncs. Full feature parity with web.',
        },
      ],
    },
  ]

  return (
    <div className='relative overflow-hidden bg-white dark:bg-slate-950'>
      <main className='relative z-10'>
        <section className='px-6 py-20 pt-32'>
          <div className='mx-auto max-w-4xl'>
            <h1 className='text-5xl md:text-6xl font-black mb-6 text-center'>
              Common questions, <span className='text-gradient'>real answers</span>
            </h1>
            <p className='text-center text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16'>
              We built this for ambitious college students. Here's what they ask.
            </p>

            {/* FAQ Tabs */}
            <div className='flex flex-wrap justify-center gap-2 mb-12'>
              {categories.map((category, i) => (
                <button
                  key={i}
                  onClick={() => setOpenIndex(i)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    openIndex === i
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* FAQ Content */}
            <div className='space-y-4'>
              {categories[openIndex].faqs.map((faq, i) => (
                <div
                  key={i}
                  className='rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow'
                >
                  <button
                    className='w-full text-left px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors flex items-start justify-between gap-4'
                    onClick={() => {}}
                  >
                    <h3 className='font-semibold text-gray-900 dark:text-white leading-tight'>
                      {faq.q}
                    </h3>
                    <ChevronDown className='w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5' />
                  </button>
                  <div className='px-6 py-4 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-800'>
                    <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className='mt-16 text-center'>
              <p className='text-lg text-gray-600 dark:text-gray-400 mb-6'>
                Still have questions? Email <a href='mailto:support@learnmore.ai' className='text-blue-600 dark:text-blue-400 font-semibold hover:underline'>support@learnmore.ai</a>
              </p>
              <a href='/get-started' className='inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-700 hover:to-purple-700 transition-all'>
                Start Studying Free
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
