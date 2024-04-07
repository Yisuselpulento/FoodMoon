import { useState, useEffect, createContext } from 'react'
import { categorias } from '../helpers/categories'
import { useNavigate } from 'react-router-dom'

const ProductsContext = createContext()

const ProductsProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [categorieActual, setCategorieActual] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    setCategories(categorias)
  }, [])

  useEffect(() => {
    setCategorieActual(categories[0])
  }, [categories])

  const handleClickCategoria = id => {
    const categoria = categories.filter(cat => cat.id === id)
    setCategorieActual(categoria[0])
    navigate('/')
  }

  return (
    <ProductsContext.Provider
      value={{
        categories,
        handleClickCategoria,
        categorieActual
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
