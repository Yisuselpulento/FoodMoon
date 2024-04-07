import { useContext } from 'react'
import ProductsContext from '../context/ProductsContext'

const useProducts = () => {
  return useContext(ProductsContext)
}

export default useProducts
