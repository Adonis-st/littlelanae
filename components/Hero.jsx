

const Hero = () => {
  return (
   <>  
    <div className='hero '>
      <div className='hero-text'>
      <h1 className="text-2xl sm:text-5xl sm:pb-2">Little Lanae</h1>
      <p className="text-sm sm:text-lg lg:text-2xl"> I had a little bit of free time, so I made this website to show my appreciation for you being a <span>somewhat decent </span> aunt.</p>
      </div>
      <img className='hero-img sm:hidden'src="/images/hero/mobile.png" alt="" />
      <img  className="hidden sm:inline-block rotate-[135deg] w-[10%] max-w-[90px] order-[-3] self-start" src="/images/hero/right-angle.svg" alt="" />
      <img className="hero-desk-img sm:order-[3] self-start  mt-10" src="/images/hero/desk1.png" alt="" />
      <img className="hero-desk-img sm:order-[-1] self-end mb-[3.5rem]" src="/images/hero/desk2.png" alt="" />
      <img  className="hidden sm:inline-block rotate-[315deg] w-[10%] max-w-[90px] order-[4] self-end" src="/images/hero/right-angle.svg" alt="" />
      </div>
    </>
  )
}

export default Hero