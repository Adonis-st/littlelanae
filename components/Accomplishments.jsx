
const Accomplishments = () => {
  return (
    <div className='flex flex-col items-center w-11/12 mx-auto my-9'>
      <h2 className='text-center text-3xl mb-3'>Accomplishments</h2>
       <div class="rounded-lg overflow-hidden shadow-lg max-w-[450px]">
         <img class="w-full" src="/images/acc/workout.png" alt="" />
         <div class="px-6 py-4">
         <h3 class="font-bold text-xl mb-2">Fitness</h3>
         <p class="text-gray-900 text-base">
         You came a long since your Planet Fitness days
          and have made tremendous progress along the way. 
          <small> You still cannot hang</small> 
         </p>
      </div>
      <div class="px-6 pt-4 pb-2 rounded-lg">
         <span class="inline-block bg-gray-200 dark:bg-rose-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2">#gym</span>
         <span class="inline-block bg-gray-200 dark:bg-rose-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2">#fitness</span>
         <span class="inline-block bg-gray-200 dark:bg-rose-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2">#motivated</span>
         </div>
       </div>
      </div>
  )
}

export default Accomplishments