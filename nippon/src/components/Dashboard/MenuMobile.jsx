import Image from 'next/image'
import React from 'react'

const MenuMobile = ({setMobile}) => {
  return (
    <div className='menu-mobile'>

    <div className='iconos-mobile'  >
    <Image alt='' src='/logoNippon.png' width={150} height={50}/>
    <Image onClick={()=>{setMobile(false)}} alt='' src='/cerrar.png' width={50} height={50}/>
    </div>
        
    <div className='menu-mobile-div' >
        <Image alt='' src='/home.png' height={50} width={50}/>
        <span> Inicio </span>
    </div>
    <div className='menu-mobile-div' >
        <Image alt='' src='/carrito.png' height={50} width={50}/>
        <span> Carrito </span>
    </div>
    <div className='menu-mobile-div' >
        <Image alt='' src='/pedidos.png' height={50} width={50}/>
        <span> Pedidos </span>
    </div>
    <div className='menu-mobile-div' >
        <Image alt='' src='/facturas.png' height={50} width={50}/>
        <span> Facturas </span>
    </div>

    <button className='button-popup'> Cerrar sesion </button>



    </div>
  )
}

export default MenuMobile