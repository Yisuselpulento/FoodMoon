import { useState } from 'react'
import useProducts from '../../hooks/useProducts'
import { productImg } from '../../helpers/productImg'

const initialForm = { nombre: '', precio: '', categoriaId: '', imagen: '' }

const AdminProductos = () => {
  const { productos, categories, agregarProducto, eliminarProductoCatalogo } = useProducts()
  const [form, setForm] = useState(initialForm)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  const nombreCategoria = (id) => categories.find(c => c.id === id)?.nombre ?? '—'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 1.5 * 1024 * 1024) {
      setError('La imagen supera 1.5MB, elige una más liviana.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setForm(prev => ({ ...prev, imagen: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(''); setMsg('')
    if (!form.nombre.trim()) return setError('El nombre es obligatorio')
    const precio = parseFloat(form.precio)
    if (!(precio > 0)) return setError('El precio debe ser mayor a 0')
    if (!form.categoriaId) return setError('Elige una categoría')

    agregarProducto({
      nombre: form.nombre.trim(),
      precio,
      categoriaId: Number(form.categoriaId),
      imagen: form.imagen
    })
    setForm(initialForm)
    setMsg('Producto agregado ✅')
    setTimeout(() => setMsg(''), 3000)
  }

  const custom = productos.filter(p => !p.base)

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-3xl font-black'>Productos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow p-6 border grid md:grid-cols-2 gap-4'>
        <h2 className='md:col-span-2 text-xl font-bold'>Agregar producto</h2>
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-bold'>Nombre</label>
          <input name='nombre' value={form.nombre} onChange={handleChange} className='border rounded p-2' placeholder='Ej: Café Latte' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-bold'>Precio</label>
          <input name='precio' type='number' step='0.1' min='0' value={form.precio} onChange={handleChange} className='border rounded p-2' placeholder='0.00' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-bold'>Categoría</label>
          <select name='categoriaId' value={form.categoriaId} onChange={handleChange} className='border rounded p-2 bg-white'>
            <option value=''>Selecciona…</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-bold'>Imagen</label>
          <input type='file' accept='image/*' onChange={handleFile} className='border rounded p-2 bg-white' />
        </div>
        {form.imagen && (
          <img src={form.imagen} alt='preview' className='w-24 h-24 object-cover rounded border md:col-span-2' />
        )}
        {error && <p className='text-red-500 md:col-span-2'>{error}</p>}
        {msg && <p className='text-green-600 md:col-span-2'>{msg}</p>}
        <button type='submit' className='md:col-span-2 bg-primary hover:bg-hoverPrimary text-white font-bold p-3 rounded uppercase'>
          Agregar producto
        </button>
      </form>

      {/* Catalogo agregado */}
      <div className='bg-white rounded-lg shadow p-6 border'>
        <h2 className='text-xl font-bold mb-3'>Productos agregados ({custom.length})</h2>
        {custom.length === 0
          ? <p className='text-gray-500'>Todavía no agregaste productos. Los del catálogo base no se listan aquí.</p>
          : (
            <div className='flex flex-col divide-y'>
              {custom.map(p => (
                <div key={p.id} className='flex items-center gap-4 py-3'>
                  <img src={productImg(p.imagen)} alt={p.nombre} className='w-14 h-14 object-cover rounded border' />
                  <div className='flex-1 min-w-0'>
                    <p className='font-bold truncate'>{p.nombre}</p>
                    <p className='text-sm text-gray-500'>{nombreCategoria(p.categoriaId)} · ${p.precio}</p>
                  </div>
                  <button
                    onClick={() => eliminarProductoCatalogo(p.id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-bold'
                  >Eliminar</button>
                </div>
              ))}
            </div>
            )}
      </div>
    </div>
  )
}

export default AdminProductos
