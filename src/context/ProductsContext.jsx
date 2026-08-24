import { useState, useEffect, createContext } from 'react'
import { categorias } from '../helpers/categories'
import { product as baseProductsRaw } from '../helpers/products'
import { useNavigate } from 'react-router-dom'

const ProductsContext = createContext()

// Los productos base traen su id derivado de la imagen (unico) y flag base.
const baseProducts = baseProductsRaw.map(p => ({ ...p, id: p.imagen, base: true }))

const readLS = (key, fallback) => {
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

const ProductsProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [categorieActual, setCategorieActual] = useState({})

  // Catalogo = base + productos creados en el admin (persistidos)
  const [customProducts, setCustomProducts] = useState(() => readLS('customProducts', []))
  const productos = [...baseProducts, ...customProducts]

  // Carrito / pedido en curso
  const [modal, setModal] = useState(false)
  const [producto, setProducto] = useState({})
  const [pedido, setPedido] = useState(() => readLS('pedido', []))

  // Ordenes confirmadas (pagos)
  const [pedidos, setPedidos] = useState(() => readLS('pedidos', []))

  const [alerta, setAlerta] = useState('')

  const navigate = useNavigate()

  useEffect(() => { setCategories(categorias) }, [])
  useEffect(() => { setCategorieActual(categories[0]) }, [categories])
  useEffect(() => { try { window.localStorage.setItem('pedido', JSON.stringify(pedido)) } catch { /* noop */ } }, [pedido])
  useEffect(() => { try { window.localStorage.setItem('customProducts', JSON.stringify(customProducts)) } catch { /* noop */ } }, [customProducts])
  useEffect(() => { try { window.localStorage.setItem('pedidos', JSON.stringify(pedidos)) } catch { /* noop */ } }, [pedidos])

  const handleClickCategoria = id => {
    const categoria = categories.filter(cat => cat.id === id)
    setCategorieActual(categoria[0])
    navigate('/')
  }

  const handleClickModal = () => setModal(!modal)
  const handleSetProducto = producto => setProducto(producto)

  const handleAgregarPedido = (prod) => {
    setPedido(prev =>
      prev.some(p => p.id === prod.id)
        ? prev.map(p => (p.id === prod.id ? prod : p))
        : [...prev, prod]
    )
    setModal(false)
    setProducto({})
  }

  const handleEditarCantidad = id => {
    const productoActualizar = pedido.find(p => p.id === id)
    setProducto(productoActualizar)
    setModal(true)
  }

  const handleEliminarProducto = id => {
    setPedido(prev => prev.filter(p => p.id !== id))
  }

  const total = pedido.reduce((sum, p) => sum + p.precio * p.cantidad, 0)
  const totalProductos = pedido.reduce((sum, p) => sum + p.cantidad, 0)

  const handleConfirmarPedido = () => {
    if (pedido.length === 0) return
    const orden = {
      id: 'ped_' + Date.now(),
      fecha: new Date().toISOString(),
      items: pedido,
      cantidad: totalProductos,
      total
    }
    setPedidos(prev => [orden, ...prev])
    setPedido([])
    setProducto({})
    setModal(false)
    setAlerta('¡Pedido confirmado! Gracias por tu compra 🎉')
    setTimeout(() => setAlerta(''), 4000)
    navigate('/')
  }

  // ----- Admin: catalogo -----
  const agregarProducto = (nuevo) => {
    setCustomProducts(prev => [...prev, { ...nuevo, id: 'c_' + Date.now(), base: false }])
  }
  const eliminarProductoCatalogo = (id) => {
    setCustomProducts(prev => prev.filter(p => p.id !== id))
  }
  const limpiarPedidos = () => setPedidos([])

  return (
    <ProductsContext.Provider
      value={{
        categories,
        handleClickCategoria,
        categorieActual,
        productos,
        modal,
        handleClickModal,
        producto,
        handleSetProducto,
        pedido,
        handleAgregarPedido,
        handleEditarCantidad,
        handleEliminarProducto,
        handleConfirmarPedido,
        total,
        totalProductos,
        alerta,
        // admin
        pedidos,
        agregarProducto,
        eliminarProductoCatalogo,
        limpiarPedidos
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export {
  ProductsProvider
}

export default ProductsContext
