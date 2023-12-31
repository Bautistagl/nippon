import { auth, db } from '@/firebasebautista'
import {  signOut } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { get, ref } from 'firebase/database'

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);



  const router = useRouter();
  const cerrarSesion = () => {
    signOut(auth)
.then(() => {
  router.push('/');
})
.catch((error) => {

});
}
useEffect(() => {

  const userId = localStorage.getItem('userId');


  const userRef = ref(db, `usuarios/${userId}`);
  get(userRef).then((snapshot) => {

    if (snapshot.exists()) {
      const userData = snapshot.val();
     
      setIsAdmin(userData.admin);
    }
  });
}, [user]);



  return (
    <div className='sidebar'>
      <div style={{display:'flex', flexDirection:'column'}}>

      <Link href='/'>
        <Image className='iconos-sidebar'  width={160} height={45} alt='' priority={true} src='/logoMarronOk.png'/>
      </Link>
      <Link href='/'>
        <Image className='iconos-sidebar'  width={110} height={20} alt='' src='/letrasMarronOk.png'/>
      </Link>
      </div>
        <ul className='ul-sidebar'>
            <li> <Link className='link-sidebar' href='/dashboard'> Inicio </Link>  </li>
            <li> <Link className='link-sidebar' href='/dashboard/carrito'> Carrito </Link></li>
            <li> <Link className='link-sidebar' href='/dashboard/pedidos'>  Historial Pedidos  </Link></li>
            {/* <li> Facturas </li> */}
            {isAdmin === true && (
                <>
            <li> <Link className='link-sidebar' href='/dashboard/admins/pedidosPendientes'> Pedidos  </Link>  </li>
            <li> <Link className='link-sidebar' href='/dashboard/admin/crearProductos'> Crear producto </Link></li>
                </>
         
        )}
           
          
        </ul>
        
        <button className='boton-sidebar' onClick={()=>{cerrarSesion()}}> Cerrar sesion</button>
        
    </div>
  )
}

export default Sidebar