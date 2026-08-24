import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

export const Total = () => {
  const { pedido, total, totalProductos, handleConfirmarPedido } = useProducts()
  const isEmpty = pedido.length === 0

  return (
    <>
      <h1 className='md:text-4xl text-xl font-black'>Total y confirmar pedido</h1>
      <p className='md:text-2xl md:my-3'>Confirma tu pedido a continuacion</p>

      {isEmpty
        ? (
          <p className='text-lg text-gray-600 mt-4'>
            Tu pedido está vacío.{' '}
            <Link to='/' className='text-blue-600 font-bold underline'>Ver productos</Link>
          </p>
          )
        : (
          <div className='max-w-[500px] mt-6 bg-white/70 border rounded-lg p-6 shadow flex flex-col gap-4'>
            <div className='flex justify-between text-lg'>
              <span>Productos</span>
              <span className='font-bold'>{totalProductos}</span>
            </div>
            <div className='flex justify-between items-center border-t pt-4'>
              <span className='text-xl font-bold'>Total a pagar</span>
              <span className='text-4xl font-black text-yellow-600'>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleConfirmarPedido}
              className='bg-blue-500 hover:bg-blue-600 text-white p-3 rounded uppercase font-bold'
            >Confirmar pedido</button>
            <Link to='/summary' className='text-center text-blue-600 font-bold hover:underline'>
              &larr; Volver al resumen
            </Link>
          </div>
          )}
    </>
  )
}
