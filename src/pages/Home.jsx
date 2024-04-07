import React from 'react'
import useProducts from '../hooks/useProducts'
import { product } from '../helpers/products.js'
import CardProducts from '../Components/CardProducts.jsx'

const Home = () => {
  const { categorieActual } = useProducts()

  return (
    <>
      <h1 className='md:text-4xl text-2xl font-black'>{categorieActual?.nombre}</h1>
      <p className='md:text-2xl md:my-10'>
        Elige tu pedido a continuacion
      </p>
      <div className='flex flex-wrap gap-10 w-full'>

        {product.map((product, i) => (
          <CardProducts
            key={i}
            product={product}
          />
        )
        )}

      </div>

    </>
  )
}

export default Home
