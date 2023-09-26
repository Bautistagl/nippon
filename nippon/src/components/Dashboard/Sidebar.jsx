import { auth } from '@/firebasebautista'
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router';

const Sidebar = () => {

  const router = useRouter();
  const cerrarSesion = () => {
    signOut(auth)
.then(() => {
  router.push('/');
})
.catch((error) => {
// Manejo de errores, si es necesario
});
}

  return (
    <div className='sidebar'>
      <Link href='/'>
        <Image style={{marginTop:'25px',marginLeft:'20px'}} width={100} height={30} alt='' priority={true} src='/logoNippon.png'/>
      </Link>
      <Link href='/'>
        <Image style={{marginTop:'30px',marginLeft:'20px'}} width={100} height={25} alt='' src='/letraNippon.png'/>
      </Link>
        <ul className='ul-sidebar'>
            <li> <Link href='/dashboard'> Inicio </Link>  </li>
            <li> <Link href='/dashboard/carrito'> Carrito </Link></li>
            <li> <Link href='/dashboard/pedidos'>  Historial Pedidos  </Link></li>
            <li> Facturas </li>
            <li> Mi informacion</li>
        </ul>
        
        <button className='boton-sidebar' onClick={()=>{cerrarSesion()}}> Cerrar sesion</button>
        
    </div>
  )
}

export default Sidebar