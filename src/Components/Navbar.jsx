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
        {navLinks.map((link, index) => (
          <li key={index} className='flex justify-center items-center h-[40px] '>
            <NavLink
              to={link.to}
              className={({ isActive }) => `bg-primary text-white hover:bg-hoverPrimary p-2 px-3 rounded md:font-bold md:w-[100px] text-center $ ${isActive ? 'bg-yellow-500' : ''}`}
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
