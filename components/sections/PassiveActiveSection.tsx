import Scribble from './Scribble'

export default function PassiveActiveSection() {
  return (
    <section id='comparison-visual' className='relative section-container overflow-hidden'>
      <Scribble variant='round' className='absolute -right-14 top-4 hidden md:block opacity-50' />
      <Scribble variant='penEraser' className='absolute -left-8 bottom-4 hidden -rotate-3 opacity-35 lg:block' />
      <div className='mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 relative z-10'>
        {/* Passive */}
        <div className='card-container border border-red-500/20'>
          <h3 className='text-2xl font-black mb-6 text-red-600 dark:text-red-400'>Passive Learning</h3>
          <div className='space-y-4'>
            <p className='text-gray-700 dark:text-gray-300'>Rereading and highlighting can feel productive in the moment.</p>
            <p className='text-gray-700 dark:text-gray-300'>But retention drops quickly, and confidence is often misleading.</p>
          </div>
        </div>

        {/* Active */}
        <div className='card-container border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5'>
          <h3 className='text-2xl font-black mb-6 text-emerald-600 dark:text-emerald-400'>Active Learning</h3>
          <div className='space-y-4'>
            <p className='text-gray-700 dark:text-gray-300'>Short retrieval-based micro-tests reinforce what you actually need to remember.</p>
            <p className='text-gray-700 dark:text-gray-300'>You get measurable progress and stronger recall over time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

