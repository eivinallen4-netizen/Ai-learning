import { Check, X } from 'lucide-react'

export default function ComparisonTableSection() {
  return (
    <section id='comparison-table' className='section-container'>
      <div className='mx-auto w-full max-w-6xl relative z-10'>
        {/* Header */}
        <div className='section-header'>
          <h2 className='section-title'>Comparison</h2>
          <p className='section-subtitle'>
            Compare common study methods and see which one gives you practical retention gains with less wasted effort.
          </p>
        </div>

        {/* Table */}
        <div className='mt-8 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 card-container'>
          <table className='w-full text-sm'>
            <thead className='bg-gray-100 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700'>
              <tr>
                <th className='px-6 py-4 text-left font-bold text-gray-900 dark:text-white'>Capability</th>
                <th className='px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-300'>Traditional Notes</th>
                <th className='px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-300'>Flashcards</th>
                <th className='px-6 py-4 text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg'>Learn More LGO</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Auto quiz from docs', false, false, true],
                ['Weak-topic detection', false, false, true],
                ['5-minute review mode', false, true, true],
                ['Retention dashboard', false, false, true],
              ].map(([label, notes, cards, lgo]) => (
                <tr key={label as string} className='border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30'>
                  <td className='px-6 py-4 text-gray-900 dark:text-gray-100 font-medium'>{label as string}</td>
                  <td className='px-6 py-4 text-center'>
                    {notes ? <Check className='mx-auto w-5 h-5 text-emerald-600' /> : <X className='mx-auto w-5 h-5 text-gray-400' />}
                  </td>
                  <td className='px-6 py-4 text-center'>
                    {cards ? <Check className='mx-auto w-5 h-5 text-emerald-600' /> : <X className='mx-auto w-5 h-5 text-gray-400' />}
                  </td>
                  <td className='px-6 py-4 text-center bg-gradient-to-r from-blue-500/5 to-purple-500/5'>
                    {lgo ? <Check className='mx-auto w-5 h-5 text-emerald-600' /> : <X className='mx-auto w-5 h-5 text-gray-400' />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

