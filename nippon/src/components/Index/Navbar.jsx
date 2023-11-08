import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = ({usuario}) => {
  return (
    <div style={{width:'100%',background:'#315253',borderBottom:'2px solid white'}}>
       
    <div className='navbar'>
        <Link href='/'>
        <Image  width={100} height={25} alt='' src='/letrasBien.png'/>
        </Link>
        <ul className='ul-navbar'>
            <li> Inicio </li>
            <li> Nosotros </li>
            <li> Catalogo</li>
            <li> <Link href='/decoracion'> Decoracion </Link>  </li>
            
            <li>  <Link target="_blank"  href='https://mecaglass.mercadoshops.com.ar'>MercadoShops</Link>  </li>
           
        </ul>

      {usuario == '' ? 
      
        <Link href='/login'>
        <button>Login</button>
        </Link>
      :
      <Link href='/dashboard'>
      <img className='icono-navbar' alt='' src='/home.png'/> 
      </Link>
      
      }
      
       
    </div>
    </div>
  )
}

export default Navbar