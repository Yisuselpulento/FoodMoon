import { NavLink } from 'react-router-dom'

const Navbar = () => {
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
              className={({ isActive }) => `text-white hover:bg-hoverPrimary p-2 px-3 rounded md:font-bold md:w-[100px] text-center ${isActive ? 'bg-yellow-600' : 'bg-primary'}`}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>

    </nav>
  )
}

export default Navbar
