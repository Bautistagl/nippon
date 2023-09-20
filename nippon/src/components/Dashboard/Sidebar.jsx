import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Image style={{marginTop:'25px',marginLeft:'20px'}} width={100} height={30} alt='' src='/logoNippon.png'/>
        <Image style={{marginTop:'30px',marginLeft:'20px'}} width={100} height={25} alt='' src='/letraNippon.png'/>
        <ul className='ul-sidebar'>
            <li> <Link href='/dashboard'> Inicio </Link>  </li>
            <li> <Link href='/dashboard/carrito'> Carrito </Link></li>
            <li> <Link href='/dashboard/pedidos'>  Historial Pedidos  </Link></li>
            <li> Facturas </li>
            <li> Mi informacion</li>
            
        </ul>
    </div>
  )
}

export default Sidebar