import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      
        <Image style={{marginTop:'30px',marginLeft:'60px'}} width={100} height={25} alt='' src='/letraNippon.png'/>
        <ul className='ul-navbar'>
            <li> Inicio </li>
            <li> Nosotros </li>
            <li> Catalogo</li>
            <li> Clientes </li>
        </ul>
       
    </div>
  )
}

export default Navbar