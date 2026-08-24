import useProducts from '../../hooks/useProducts'
import { productImg } from '../../helpers/productImg'

const AdminPedidos = () => {
  const { pedidos, limpiarPedidos } = useProducts()
  const ingresos = pedidos.reduce((s, p) => s + p.total, 0)

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <h1 className='text-3xl font-black'>Pedidos y pagos</h1>
        {pedidos.length > 0 && (
          <button
            onClick={() => { if (window.confirm('¿Vaciar todo el historial de pedidos?')) limpiarPedidos() }}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-bold'
          >Vaciar historial</button>
        )}
      </div>

      <div className='bg-white rounded-lg shadow p-6 border flex items-center justify-between'>
        <span className='text-gray-500'>Ingresos totales</span>
        <span className='text-3xl font-black text-green-600'>${ingresos.toFixed(2)}</span>
      </div>

      {pedidos.length === 0
        ? <p className='text-gray-500'>Aún no hay pedidos registrados.</p>
        : (
          <div className='flex flex-col gap-4'>
            {pedidos.map(p => (
              <div key={p.id} className='bg-white rounded-lg shadow p-5 border'>
                <div className='flex justify-between items-center flex-wrap gap-2 border-b pb-3 mb-3'>
                  <div>
                    <p className='font-bold'>Pedido #{p.id.replace('ped_', '')}</p>
                    <p className='text-sm text-gray-500'>{new Date(p.fecha).toLocaleString()}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm text-gray-500'>{p.cantidad} artículos</p>
                    <p className='text-2xl font-black text-green-600'>${p.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  {p.items.map(it => (
                    <div key={it.id} className='flex items-center gap-3 text-sm'>
                      <img src={productImg(it.imagen)} alt={it.nombre} className='w-10 h-10 object-cover rounded border' />
                      <span className='flex-1 min-w-0 truncate'>{it.nombre}</span>
                      <span className='text-gray-500'>{it.cantidad} × ${it.precio}</span>
                      <span className='font-bold w-20 text-right'>${(it.precio * it.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          )}
    </div>
  )
}

export default AdminPedidos
