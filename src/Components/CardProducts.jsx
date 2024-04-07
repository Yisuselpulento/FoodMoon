import React from 'react'
import useProducts from '../hooks/useProducts'

const CardProducts = ({ product }) => {
  const { categorieActual } = useProducts()
  const { nombre, imagen, precio, categoriaId } = product
  return (
    <>
      {categorieActual?.id === categoriaId &&
        <div className='p-3 rounded flex flex-col items-center bg-yellow-200 shadow-lg border-[1px] border-yellow-300 w-80'>
          <img
            src={`./images/${imagen}.webp`}
            alt={`Imagen platillo ${nombre}`}
            className='w-60'
          />
          <div>
            <h3 className='h-[70px] w-[270px] text-2xl font-bold '>{nombre}</h3>
            <p className='font-black text-4xl text-yellow-500'>{precio}</p>
            <button
              type='button'
              className='bg-gradient-to-r from-pink-400 to-red-500 hover:bg-blue-500 text-white w-full mt-5 p-3 uppercase font-bold'
              onClick={() => {
              /*   handleSetProducto(producto)
                handleChangeModal() */
              }}
            >
              Agregar
            </button>
          </div>
        </div>}
    </>
  )
}

export default CardProducts
