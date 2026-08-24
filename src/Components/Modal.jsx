import { useState, useEffect } from 'react'
import useProducts from '../hooks/useProducts'

const Modal = () => {
  const { producto, handleClickModal, handleAgregarPedido } = useProducts()
  const [cantidad, setCantidad] = useState(1)
  const [edicion, setEdicion] = useState(false)

  useEffect(() => {
    if (producto?.cantidad) {
      setCantidad(producto.cantidad)
      setEdicion(true)
    } else {
      setCantidad(1)
      setEdicion(false)
    }
  }, [producto])

  // Cerrar con Escape
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') handleClickModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      className='fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4'
      onClick={handleClickModal}
    >
      <div
        className='bg-white rounded-lg max-w-md w-full p-6 relative shadow-2xl'
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClickModal}
          aria-label='Cerrar'
          className='absolute top-2 right-3 text-3xl leading-none font-bold text-gray-500 hover:text-gray-800'
        >&times;</button>

        <img
          src={`/images/${producto.imagen}.webp`}
          alt={producto.nombre}
          className='rounded-lg w-full h-56 object-cover'
        />
        <h2 className='text-2xl font-black mt-4'>{producto.nombre}</h2>
        <p className='text-3xl font-black text-yellow-500 my-3'>${producto.precio}</p>

        <div className='flex items-center justify-center gap-6 my-4'>
          <button
            onClick={() => setCantidad(c => Math.max(1, c - 1))}
            aria-label='Disminuir'
            className='bg-primary hover:bg-hoverPrimary text-white w-12 h-12 rounded-full text-2xl font-bold flex items-center justify-center'
          >-</button>
          <span className='text-3xl font-bold w-12 text-center'>{cantidad}</span>
          <button
            onClick={() => setCantidad(c => c + 1)}
            aria-label='Aumentar'
            className='bg-primary hover:bg-hoverPrimary text-white w-12 h-12 rounded-full text-2xl font-bold flex items-center justify-center'
          >+</button>
        </div>

        <button
          onClick={() => handleAgregarPedido({ ...producto, cantidad })}
          className='bg-blue-500 hover:bg-blue-600 w-full p-3 uppercase font-bold rounded text-white'
        >
          {edicion ? 'Actualizar' : 'Añadir'} — ${(producto.precio * cantidad).toFixed(2)}
        </button>
      </div>
    </div>
  )
}

export default Modal
