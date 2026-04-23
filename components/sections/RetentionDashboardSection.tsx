import Scribble from './Scribble'

export default function RetentionDashboardSection() {
  return (
    <section id='retention-dashboard' className='relative section-container overflow-hidden'>
      <Scribble variant='tall' className='absolute -left-6 bottom-0 hidden lg:block opacity-50' />
      <div className='mx-auto w-full max-w-6xl relative z-10'>
        {/* Header */}
        <div className='section-header'>
          <h2 className='section-title'>Retention Dashboard</h2>
          <p className='section-subtitle'>
            See how your memory is changing over time, spot weak topics early, and track progress with clear numbers.
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className='card-container'>
          <div className='grid gap-6 md:grid-cols-4'>
            {/* Stat 1 */}
            <div className='rounded-lg border border-blue-500/20 p-6 bg-gradient-to-br from-blue-500/5 to-transparent'>
              <p className='text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-3'>Overall Retention</p>
              <p className='text-4xl font-black text-blue-600 dark:text-blue-400'>87%</p>
              <p className='text-xs text-gray-500 mt-2'>↑ Up from 82% last week</p>
            </div>

            {/* Stat 2 */}
            <div className='rounded-lg border border-amber-500/20 p-6 bg-gradient-to-br from-amber-500/5 to-transparent'>
              <p className='text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-3'>Weak Topic</p>
              <p className='text-2xl font-bold text-amber-600 dark:text-amber-400'>Inference</p>
              <p className='text-xs text-gray-500 mt-2'>Review recommended</p>
            </div>

            {/* Stat 3 */}
            <div className='rounded-lg border border-emerald-500/20 p-6 bg-gradient-to-br from-emerald-500/5 to-transparent'>
              <p className='text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-3'>This Week</p>
              <p className='text-4xl font-black text-emerald-600 dark:text-emerald-400'>+12%</p>
              <p className='text-xs text-gray-500 mt-2'>Improvement</p>
            </div>

            {/* Stat 4 */}
            <div className='rounded-lg border border-purple-500/20 p-6 bg-gradient-to-br from-purple-500/5 to-transparent'>
              <p className='text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-3'>Sessions</p>
              <p className='text-4xl font-black text-purple-600 dark:text-purple-400'>18</p>
              <p className='text-xs text-gray-500 mt-2'>Total completed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

