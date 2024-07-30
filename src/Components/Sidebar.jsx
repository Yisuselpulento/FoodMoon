import useProducts from '../hooks/useProducts'

const Sidebar = ({ handleMenuActive }) => {
  const { categories, handleClickCategoria, categorieActual } = useProducts()

  return (
    <div>
      <img src='/images/MonssterLogoLight.webp' className='hidden md:flex p-2 m-3 bg-hoverPrimary rounded-full w-[50px] h-[50px]' alt='logo principal de la pagina' />
      <nav className='mt-16 md:mt-10'>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${categorieActual?.id === cat.id ? 'bg-yellow-500' : ''} p-5 bg-primary hover:bg-hoverPrimary flex items-center gap-3 md:w-[290px] w-full text-white font-bold text-xl border-t-[1px]  border-hoverPrimary `}
            onClick={() => {
              handleClickCategoria(cat.id)
              handleMenuActive()
            }}
          >
            <img
              src={`/images/icono_${cat.icono}.svg`}
              className='md:w-[50px] w-[30px]'
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
