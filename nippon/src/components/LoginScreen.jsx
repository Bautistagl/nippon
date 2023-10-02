import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebasebautista';
import Image from 'next/image';
import Swal from 'sweetalert2'
import Link from 'next/link';
import { useRouter } from 'next/router';
const LoginScreen = () => {
  const router = useRouter();

  const [email,setEmail] = useState('')
  const [contrasena,setContrasena] = useState('')

 const iniciarSesion = (e) => {
   e.preventDefault();

  signInWithEmailAndPassword(auth, email, contrasena)
  .then((userCredential) => {
   
    router.push('/dashboard');
    
    
  })
  .catch((error) => {
    // Error durante el inicio de sesión
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: 'error',
      title: 'Email o contraseña incorrecta',
      
      footer: '<a href="https://www.mercadolibre.com.ar/">Recuperar contraseña</a>'
    })
    console.error('Error de inicio de sesión:', errorCode, errorMessage);
  });

 }
  
  return (
    <>
    <span style={{opacity:'0'}}>.</span>
    <div className='login-form'>
    <Image priority={true} className='icono-login' alt='' src='/logoBien.png' width={180} height={55}/>
      <Image className='icono-login' alt='' src='/letrasBien.png' width={120} height={30}/>
      <form style={{display:'flex',flexDirection:'column'}} onSubmit={(e)=>{iniciarSesion(e)}}>
        <input className='input-login' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
        <input className='input-login' onChange={(e)=>setContrasena(e.target.value)} type='password' placeholder='Contraseña'/>
        <button className='boton-login' type='submit'> Iniciar sesion</button>
      </form>
      <h4> No tenes una cuenta? <Link href='/register'>
      <span> Registrate aca!</span> </Link> </h4>
    </div>
    <span style={{opacity:'0'}}>.</span>
    </>
  )
}

export default LoginScreen