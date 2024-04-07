import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const navLinks = [
    { to: '/', text: 'Inicio' },
    { to: '/summary', text: 'Resumen' },
    { to: '/total', text: 'Total' }

  ]

  return (
    <nav>
      <ul className='flex justify-between '>
        {navLinks.map((link, index) => (
          <li key={index} className='flex justify-center items-center h-[30px] '>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'font-bold bg-pink-400  text-white w-full flex items-center justify-center md:w-[100px] h-full p-5 shadow-lg rounded' : 'font-bold h-full bg-pink-300 text-white hover:bg-pink-200  w-full flex items-center justify-center md:w-[100px]  p-5 shadow-lg rounded'}
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
