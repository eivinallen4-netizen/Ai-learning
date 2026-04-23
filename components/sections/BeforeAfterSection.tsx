export default function BeforeAfterSection() {
  return (
    <section id='before-after' className='section-container'>
      <div className='mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 relative z-10'>
        {/* Before */}
        <div className='card-container border border-red-500/20'>
          <h3 className='text-2xl font-black mb-6 text-red-600 dark:text-red-400'>Without Adaptive Learning</h3>
          <div className='space-y-4'>
            <div className='flex gap-3 items-start'>
              <div className='text-2xl flex-shrink-0'>❌</div>
              <p className='text-gray-700 dark:text-gray-300'>Study sessions feel long but results are inconsistent.</p>
            </div>
            <div className='flex gap-3 items-start'>
              <div className='text-2xl flex-shrink-0'>❌</div>
              <p className='text-gray-700 dark:text-gray-300'>Weak areas stay hidden until deadlines are close.</p>
            </div>
            <div className='flex gap-3 items-start'>
              <div className='text-2xl flex-shrink-0'>❌</div>
              <p className='text-gray-700 dark:text-gray-300'>More effort goes in than retention comes out.</p>
            </div>
          </div>
        </div>

        {/* After */}
        <div className='card-container border border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5'>
          <h3 className='text-2xl font-black mb-6 text-emerald-600 dark:text-emerald-400'>With Adaptive Learning</h3>
          <div className='space-y-4'>
            <div className='flex gap-3 items-start'>
              <div className='text-2xl flex-shrink-0'>✅</div>
              <p className='text-gray-700 dark:text-gray-300'>Short AI micro-tests make recall practice consistent.</p>
            </div>
            <div className='flex gap-3 items-start'>
              <div className='text-2xl flex-shrink-0'>✅</div>
              <p className='text-gray-700 dark:text-gray-300'>Weak topics are surfaced early and reviewed on purpose.</p>
            </div>
            <div className='flex gap-3 items-start'>
              <div className='text-2xl flex-shrink-0'>✅</div>
              <p className='text-gray-700 dark:text-gray-300'>You learn faster, remember longer, and cram less.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

