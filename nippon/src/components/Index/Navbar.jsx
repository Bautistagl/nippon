import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = ({usuario}) => {
  return (
    <div style={{width:'100%',background:'#315253',borderBottom:'2px solid white'}}>
       
    <div className='navbar'>
      
        <Image  width={100} height={25} alt='' src='/letrasBien.png'/>
        <ul className='ul-navbar'>
            <li> Inicio </li>
            <li> Nosotros </li>
            <li> Catalogo</li>
            <li> Clientes </li>
        </ul>

      {usuario == '' ? 
      
        <Link href='/login'>
        <button>Login</button>
        </Link>
      :
      <Link href='/dashboard'>
      <img className='icono-navbar' alt='' src='/home.png'/> : 
      </Link>
      
      }
      
       
    </div>
    </div>
  )
}

export default Navbar