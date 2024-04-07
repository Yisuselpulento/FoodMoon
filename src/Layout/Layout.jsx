import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import { NavbarIco } from '../icons/icons'
import { useState } from 'react'

const Layout = () => {
  const [activeMenu, setactiveMenu] = useState(true)

  const handleMenuActive = () => {
    setactiveMenu(!activeMenu)
  }

  return (
    <div className='flex flex-col'>
      <button
        onClick={handleMenuActive}
        className='md:hidden p-3 rounded-full m-2 dark:bg-primary bg-pink-300 fixed z-30'
      >
        <NavbarIco color='white' />

      </button>
      <div className='flex'>
        <aside className={`md:w-2/12 fixed z-20 md:static ${activeMenu && 'hidden md:flex'}  `}>
          <Sidebar handleMenuActive={handleMenuActive} />
        </aside>
        <div className='flex flex-col gap-5 w-full p-5 mt-12 md:mt-0'>
          <header><Navbar /></header>
          <main className=' min-h-screen md:min-h-[700px] w-ful flex flex-col md:gap-2 gap-4'><Outlet /></main>
        </div>
      </div>
      <footer className='flex items-center justify-center h-[100px] bg-yellow-200 font-bold'>Derechos reservador por Monsster</footer>

    </div>
  )
}

export default Layout
