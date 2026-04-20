// NOTE: Landing page comparison table showing product differences.
import { Check, X } from 'lucide-react'

// NOTE: `ComparisonTableSection` encapsulates reusable logic for this module.
export default function ComparisonTableSection() {
  return (
    <section id='comparison-table' className='px-6 py-16'>
      <div className='mx-auto w-full max-w-6xl'>
        <h2 className='text-3xl font-semibold'>Comparison</h2>
        <p className='mt-3 max-w-2xl text-muted-foreground'>
          Compare common study methods and see which one gives you practical retention gains with less wasted effort.
        </p>
        <div className='mt-8 overflow-x-auto rounded-xl border'>
          <table className='w-full text-sm'>
            <thead className='bg-muted/40'>
              <tr>
                <th className='px-4 py-3 text-left'>Capability</th>
                <th className='px-4 py-3 text-center'>Traditional Notes</th>
                <th className='px-4 py-3 text-center'>Flashcards</th>
                <th className='bg-primary px-4 py-3 text-center text-primary-foreground'>Learn More LGO</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Auto quiz from docs', false, false, true],
                ['Weak-topic detection', false, false, true],
                ['5-minute review mode', false, true, true],
                ['Retention dashboard', false, false, true],
              ].map(([label, notes, cards, lgo]) => (
                <tr key={label as string} className='border-t'>
                  <td className='px-4 py-3'>{label as string}</td>
                  <td className='px-4 py-3 text-center'>
                    {notes ? <Check className='mx-auto size-4 text-emerald-600' /> : <X className='mx-auto size-4 text-muted-foreground' />}
                  </td>
                  <td className='px-4 py-3 text-center'>
                    {cards ? <Check className='mx-auto size-4 text-emerald-600' /> : <X className='mx-auto size-4 text-muted-foreground' />}
                  </td>
                  <td className='bg-primary/5 px-4 py-3 text-center'>
                    {lgo ? <Check className='mx-auto size-4 text-emerald-600' /> : <X className='mx-auto size-4 text-muted-foreground' />}
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

