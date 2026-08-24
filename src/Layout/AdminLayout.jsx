import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { NavbarIco } from '../icons/icons'
import '@fontsource-variable/onest'

const links = [
  { to: '/admin', text: 'Dashboard', end: true },
  { to: '/admin/productos', text: 'Productos' },
  { to: '/admin/pedidos', text: 'Pedidos' }
]

const AdminLayout = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const salir = () => {
    window.sessionStorage.removeItem('admin_auth')
    navigate('/admin/login')
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <button
        onClick={() => setOpen(!open)}
        className='md:hidden p-3 rounded-full m-2 bg-primary hover:bg-hoverPrimary fixed z-30'
      >
        <NavbarIco color='white' />
      </button>

      <div className='flex flex-1'>
        <aside className={`md:w-64 bg-gray-900 text-white fixed md:static z-20 min-h-screen ${open ? 'flex' : 'hidden md:flex'} flex-col`}>
          <div className='p-5 text-2xl font-black border-b border-gray-700'>FoodMoon <span className='text-primary'>Admin</span></div>
          <nav className='flex flex-col mt-4 flex-1'>
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `px-5 py-3 font-bold hover:bg-gray-800 ${isActive ? 'bg-gray-800 border-l-4 border-primary' : ''}`}
              >
                {l.text}
              </NavLink>
            ))}
          </nav>
          <div className='p-4 border-t border-gray-700 flex flex-col gap-2'>
            <Link to='/' className='text-center bg-gray-700 hover:bg-gray-600 rounded p-2 text-sm'>Ver tienda</Link>
            <button onClick={salir} className='bg-red-600 hover:bg-red-700 rounded p-2 text-sm font-bold'>Cerrar sesión</button>
          </div>
        </aside>

        <main className='flex-1 p-4 md:p-10 mt-14 md:mt-0 bg-gray-50 min-h-screen'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
