import useProducts from '../hooks/useProducts'
import CardProducts from '../Components/CardProducts.jsx'

const Home = () => {
  const { categorieActual, productos } = useProducts()

  const productosFiltrados = productos.filter(
    prod => prod.categoriaId === categorieActual?.id
  )

  return (
    <>
      <h1 className='md:text-3xl text-2xl font-black'>{categorieActual?.nombre}</h1>
      <p className='md:text-xl md:my-5'>
        Elige tu pedido a continuacion
      </p>
      <div className='flex flex-wrap gap-8 w-full'>

        {productosFiltrados.map((prod) => (
          <CardProducts
            key={prod.id}
            product={prod}
          />
        ))}

      </div>

    </>
  )
}

export default Home
