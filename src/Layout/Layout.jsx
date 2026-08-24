import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import Modal from '../Components/Modal'
import { NavbarIco } from '../icons/icons'
import { useState } from 'react'
import useProducts from '../hooks/useProducts'
import '@fontsource-variable/onest'

const Layout = () => {
  const [activeMenu, setactiveMenu] = useState(true)
  const { modal, alerta } = useProducts()

  const handleMenuActive = () => {
    setactiveMenu(!activeMenu)
  }

  return (
    <div className='flex flex-col'>
      <button
        onClick={handleMenuActive}
        className='md:hidden p-3 rounded-full m-2 bg-primary hover:bg-yellow-500 fixed z-30'
      >
        <NavbarIco color='white' />

      </button>
      <div className='flex'>
        <aside className={`md:w-2/12 fixed z-20 md:static ${activeMenu && 'hidden md:flex'}`}>
          <Sidebar handleMenuActive={handleMenuActive} />
        </aside>
        <div className='flex flex-col gap-5 w-full md:p-5 p-2 mt-16 md:mt-0'>
          <header><Navbar /></header>
          {alerta && (
            <div className='bg-green-600 text-white text-center font-bold p-3 rounded mx-auto md:mx-20 w-full md:w-auto'>
              {alerta}
            </div>
          )}
          <main className=' min-h-screen md:min-h-[700px] w-full flex flex-col md:gap-2 gap-4 md:px-20 md:py-10'><Outlet /></main>
        </div>
      </div>
      {modal && <Modal />}
      <footer className='flex items-center justify-center h-[100px] bg-primary font-bold'>Made by<span className='text-gray-900'> Monsster </span></footer>

    </div>
  )
}

export default Layout
