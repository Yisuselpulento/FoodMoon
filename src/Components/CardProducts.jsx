import React from 'react'
import useProducts from '../hooks/useProducts'

const CardProducts = ({ product }) => {
  const { categorieActual } = useProducts()
  const { nombre, imagen, precio, categoriaId } = product
  return (
    <>
      {categorieActual?.id === categoriaId &&
        <div className='p-1 rounded flex flex-col items-center bg-gray-100 shadow-lg border-[1px] h-[600px] md:w-[240px] md:h-[480px] md:bg-opacity-20'>
          <img
            src={`./images/${imagen}.webp`}
            alt={`Imagen platillo ${nombre}`}
            className='rounded-lg p-1'

          />
          <div className='px-2 flex flex-col justify-between h-full w-full'>
            <h3 className=' max-w-[230px] text-lg font-extrabold mt-2'>{nombre}</h3>
            <div>
              <p className='font-black text-3xl text-yellow-500'>${precio}</p>
              <button
                type='button'
                className='bg-blue-500 hover:bg-blue-600 text-white w-full p-3 uppercase font-bold my-2'
                onClick={() => {
                  /*   handleSetProducto(producto)
                handleChangeModal() */
                }}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>}
    </>
  )
}

export default CardProducts
