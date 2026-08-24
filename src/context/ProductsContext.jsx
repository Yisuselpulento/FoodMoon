import { useState, useEffect, createContext } from 'react'
import { categorias } from '../helpers/categories'
import { useNavigate } from 'react-router-dom'

const ProductsContext = createContext()

const ProductsProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [categorieActual, setCategorieActual] = useState({})

  // Carrito / pedido
  const [modal, setModal] = useState(false)
  const [producto, setProducto] = useState({})
  const [pedido, setPedido] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('pedido')) || []
    } catch {
      return []
    }
  })
  const [alerta, setAlerta] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setCategories(categorias)
  }, [])

  useEffect(() => {
    setCategorieActual(categories[0])
  }, [categories])

  // Persistir el pedido
  useEffect(() => {
    try {
      window.localStorage.setItem('pedido', JSON.stringify(pedido))
    } catch { /* almacenamiento no disponible */ }
  }, [pedido])

  const handleClickCategoria = id => {
    const categoria = categories.filter(cat => cat.id === id)
    setCategorieActual(categoria[0])
    navigate('/')
  }

  const handleClickModal = () => setModal(!modal)

  const handleSetProducto = producto => setProducto(producto)

  const handleAgregarPedido = (prod) => {
    setPedido(prev =>
      prev.some(p => p.imagen === prod.imagen)
        ? prev.map(p => (p.imagen === prod.imagen ? prod : p))
        : [...prev, prod]
    )
    setModal(false)
    setProducto({})
  }

  const handleEditarCantidad = imagen => {
    const productoActualizar = pedido.find(p => p.imagen === imagen)
    setProducto(productoActualizar)
    setModal(true)
  }

  const handleEliminarProducto = imagen => {
    setPedido(prev => prev.filter(p => p.imagen !== imagen))
  }

  const handleConfirmarPedido = () => {
    setPedido([])
    setProducto({})
    setModal(false)
    setAlerta('¡Pedido confirmado! Gracias por tu compra 🎉')
    setTimeout(() => setAlerta(''), 4000)
    navigate('/')
  }

  const total = pedido.reduce((sum, p) => sum + p.precio * p.cantidad, 0)
  const totalProductos = pedido.reduce((sum, p) => sum + p.cantidad, 0)

  return (
    <ProductsContext.Provider
      value={{
        categories,
        handleClickCategoria,
        categorieActual,
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
        alerta
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
