import useProducts from '../hooks/useProducts'

const Sidebar = ({ handleMenuActive }) => {
  const { categories, handleClickCategoria, categorieActual } = useProducts()

  console.log(categories)
  return (
    <div>
      <img src='/images/logoFootMon.webp' className='hidden md:flex w-[120px] p-5' alt='logo principal de la pagina' />
      <nav className='mt-16 md:mt-0'>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${categorieActual?.id === cat.id ? 'bg-pink-400' : ''} p-5 bg-pink-300 hover:bg-pink-400 flex items-center gap-3 w-full text-white font-bold text-xl border-t-[1px]  border-pink-400`}
            onClick={() => {
              handleClickCategoria(cat.id)
              handleMenuActive()
            }}
          >
            <img
              src={`/images/icono_${cat.icono}.svg`}
              className='md:w-[70px] w-[30px]'
              alt={`imagen de ${cat.nombre}`}
            />
            {cat.nombre}
          </button>

        ))}
      </nav>
    </div>
  )
}

export default Sidebar
