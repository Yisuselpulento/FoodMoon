import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const ADMIN_PASSWORD = 'admin1234'

const AdminLogin = () => {
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (pass === ADMIN_PASSWORD) {
      window.sessionStorage.setItem('admin_auth', 'true')
      navigate('/admin')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <form onSubmit={submit} className='bg-white rounded-lg shadow-xl p-8 w-full max-w-sm flex flex-col gap-4 border'>
        <h1 className='text-2xl font-black text-center'>Panel de administración</h1>
        <p className='text-center text-gray-500 text-sm'>FoodMoon</p>
        <input
          type='password'
          value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder='Contraseña'
          className='border rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary'
        />
        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
        <button
          type='submit'
          className='bg-primary hover:bg-hoverPrimary text-white font-bold p-3 rounded uppercase'
        >Ingresar</button>
        <p className='text-center text-xs text-gray-400'>Demo: la contraseña es <b>admin1234</b></p>
        <Link to='/' className='text-center text-blue-600 text-sm hover:underline'>&larr; Volver a la tienda</Link>
      </form>
    </div>
  )
}

export default AdminLogin
