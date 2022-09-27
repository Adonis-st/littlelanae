import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MdMenu, MdOutlineLightMode, MdDarkMode, MdMenuOpen} from "react-icons/md"

const Nav = () => {

   const [darkMode, setDarkMode] = useState(null)

   useEffect(() => {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
         setDarkMode('dark')
      } else {
         setDarkMode('light')
      }
   }, []);
   
   useEffect(() => {
      if(darkMode === 'dark') {
         document.documentElement.classList.add('dark')
      } else {
         document.documentElement.classList.remove('dark')
      }
   }, [darkMode])

   const handleThemeSwitch = () => {
      setDarkMode( darkMode === 'dark' ? 'light' : 'dark')
   }

   const [isOpen, setIsOpen] = useState(false);
   const router = useRouter();

   const handleClick = () => {
      setIsOpen(prevState => !prevState)
   }
  return (
    <>
      <nav className='navbar'> 
         <button className='sm:hidden ml-1' onClick={handleClick}>{isOpen ? <MdMenuOpen className='w-6 h-6'/> : <MdMenu className='w-6 h-6'/>}</button>
         <button  className='sm:order-3 mr-3' onClick={handleThemeSwitch}>{darkMode === 'dark' ? <MdDarkMode className='w-5 h-5' /> : <MdOutlineLightMode className='w-5 h-5'/>}</button>
         <div className={`${
            isOpen ? '' : 'hidden'
         } w-full sm:inline-flex sm:flex-grow sm:w-auto`}>


            <div className='flex flex-col sm:flex-row pt-2 ml-3'>
            <Link href="/"><a className={`${router.pathname === '/' ? 'active' : ''} navbar-item`}>Home</a></Link>
            <Link href="/encouragement"><a className={`${router.pathname === '/encouragement' ? 'active' : ''} navbar-item`}>Encouragement</a></Link>
            <Link href="/quiz"><a className={`${router.pathname === '/quiz' ? 'active' : ''} navbar-item`}>Quiz</a></Link>
            </div>
         </div>
      </nav>
    </>
  )
}

export default Nav