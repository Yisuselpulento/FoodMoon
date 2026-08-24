import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

const Summary = () => {
  const { pedido, total, handleEditarCantidad, handleEliminarProducto } = useProducts()
  const isEmpty = pedido.length === 0

  return (
    <>
      <h1 className='md:text-4xl text-xl font-black'>Resumen</h1>
      <p className='md:text-2xl md:my-3'>Revisa tu pedido</p>

      {isEmpty
        ? <p className='text-lg text-gray-600 mt-4'>No hay productos en tu pedido aún.</p>
        : (
          <div className='flex flex-col gap-4 mt-4 max-w-[800px]'>
            {pedido.map(prod => (
              <div key={prod.imagen} className='flex gap-4 items-center bg-white/70 border rounded-lg p-3 shadow'>
                <img
                  src={`/images/${prod.imagen}.webp`}
                  alt={prod.nombre}
                  className='w-24 h-24 object-cover rounded'
                  loading='lazy'
                />
                <div className='flex-1 min-w-0'>
                  <h3 className='font-extrabold truncate'>{prod.nombre}</h3>
                  <p className='text-sm text-gray-600'>Cantidad: {prod.cantidad}</p>
                  <p className='text-sm text-gray-600'>Precio: ${prod.precio}</p>
                  <p className='font-black text-yellow-600'>Subtotal: ${(prod.precio * prod.cantidad).toFixed(2)}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <button
                    onClick={() => handleEditarCantidad(prod.imagen)}
                    className='bg-primary hover:bg-hoverPrimary text-white px-3 py-1 rounded font-bold text-sm'
                  >Editar</button>
                  <button
                    onClick={() => handleEliminarProducto(prod.imagen)}
                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold text-sm'
                  >Eliminar</button>
                </div>
              </div>
            ))}

            <div className='flex items-center justify-between border-t pt-4 mt-2'>
              <p className='text-2xl font-black'>Total: <span className='text-yellow-600'>${total.toFixed(2)}</span></p>
              <Link
                to='/total'
                className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded uppercase font-bold'
              >Confirmar pedido</Link>
            </div>
          </div>
          )}
    </>
  )
}

export default Summary
