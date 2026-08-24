import { NavLink } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

const Navbar = () => {
  const { totalProductos } = useProducts()

  const navLinks = [
    { to: '/', text: 'Inicio' },
    { to: '/summary', text: 'Resumen' },
    { to: '/total', text: 'Total' }

  ]

  return (
    <nav className='md:px-20'>
      <ul className='flex justify-between '>
        {navLinks.map((link) => (
          <li key={link.to} className='flex justify-center items-center h-[40px] '>
            <NavLink
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `relative text-white hover:bg-hoverPrimary p-2 px-3 rounded md:font-bold md:w-[100px] text-center ${isActive ? 'bg-yellow-600' : 'bg-primary'}`}
            >
              {link.text}
              {link.to === '/summary' && totalProductos > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                  {totalProductos}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

    </nav>
  )
}

export default Navbar
