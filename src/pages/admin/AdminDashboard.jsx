import useProducts from '../../hooks/useProducts'

const Card = ({ label, value, color }) => (
  <div className='bg-white rounded-lg shadow p-6 border'>
    <p className='text-gray-500 text-sm'>{label}</p>
    <p className={`text-4xl font-black ${color}`}>{value}</p>
  </div>
)

const AdminDashboard = () => {
  const { productos, pedidos } = useProducts()
  const ingresos = pedidos.reduce((s, p) => s + p.total, 0)
  const unidades = pedidos.reduce((s, p) => s + p.cantidad, 0)

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-3xl font-black'>Dashboard</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card label='Productos en catálogo' value={productos.length} color='text-blue-600' />
        <Card label='Pedidos recibidos' value={pedidos.length} color='text-purple-600' />
        <Card label='Unidades vendidas' value={unidades} color='text-orange-500' />
        <Card label='Ingresos totales' value={`$${ingresos.toFixed(2)}`} color='text-green-600' />
      </div>

      <div className='bg-white rounded-lg shadow p-6 border'>
        <h2 className='text-xl font-bold mb-3'>Últimos pedidos</h2>
        {pedidos.length === 0
          ? <p className='text-gray-500'>Aún no hay pedidos.</p>
          : (
            <ul className='flex flex-col gap-2'>
              {pedidos.slice(0, 5).map(p => (
                <li key={p.id} className='flex justify-between border-b pb-2 text-sm'>
                  <span className='text-gray-600'>{new Date(p.fecha).toLocaleString()}</span>
                  <span>{p.cantidad} art.</span>
                  <span className='font-bold text-green-600'>${p.total.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            )}
      </div>
    </div>
  )
}

export default AdminDashboard
