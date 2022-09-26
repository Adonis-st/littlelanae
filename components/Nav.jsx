import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <div>
      <nav className='relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light'> 
         <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/encouragement">Encouragement</Link></li>
            <li><Link href="/quiz">Quiz</Link></li>
         </ul>
      </nav>
      </div>
  )
}

export default Nav