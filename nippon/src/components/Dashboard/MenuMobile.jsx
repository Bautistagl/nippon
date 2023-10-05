import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MenuMobile = ({setMobile}) => {
  return (
    <div className='menu-mobile'>

    <div className='iconos-mobile'  >
    <Image alt='' src='/logoBien.png' width={100} height={30}/>
    <Image onClick={()=>{setMobile(false)}} alt='' src='/cerrar.png' width={30} height={30}/>
    </div>
        
    <div className='menu-mobile-div' >
      <Link href='/dashboard'>
        <Image alt='' src='/home.png' height={30} width={30}/>
        <span> Inicio </span>
      </Link>
    </div>
   
    <div className='menu-mobile-div' >
    <Link href='/dashboard/carrito'>
        <Image alt='' src='/carrito.png' height={30} width={30}/>
        <span> Carrito </span>
    </Link>
    </div>
    <div className='menu-mobile-div' >
      <Link href='/dashboard/pedidos'>
        <Image alt='' src='/pedidos.png' height={30} width={30}/>
        <span> Pedidos </span>
      </Link>
    </div>
    <div className='menu-mobile-div' >
        <Image alt='' src='/facturas.png' height={30} width={30}/>
        <span> Facturas </span>
    </div>

    <button className='button-popup3'> Cerrar sesion </button>



    </div>
  )
}

export default MenuMobile