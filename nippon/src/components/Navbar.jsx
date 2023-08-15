import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Image style={{marginTop:'-70px'}} width={400} height={220} alt='' src='/logoGrid.png'/>
        <ul className='ul-navbar'>
            <li> Inicio </li>
            <li> Nosotros </li>
            <li> Terracota </li>
            <li> Plastico </li>
            <li> Bazar </li>
            <li> Clientes </li>
        </ul>
    </div>
  )
}

export default Navbar