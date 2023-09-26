import React, { useState } from 'react'
import {  createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db,app } from '@/firebasebautista';
import { ref, set } from 'firebase/database';
import Image from 'next/image';
import Link from 'next/link';


const Persistence = () => {

    const [nombre,setNombre] = useState('')
    const [apellido,setApellido] = useState('')
    const [email,setEmail] = useState('')
    const [empresa,setEmpresa] = useState('')
    const [contrasena,setContrasena] = useState('')
    const [clave,setClave] = useState('')




    const cerrarSesion = () => {
        signOut(auth)
  .then(() => {
    // Cierre de sesión exitoso
  })
  .catch((error) => {
    // Manejo de errores, si es necesario
  });
    }
   
    const registrarUsuario = (e)=>{
    e.preventDefault();
       
    createUserWithEmailAndPassword(auth, email,contrasena)
  .then((userCredential) => {
    const user = userCredential.user;
    
    set(ref(db,'usuarios/'+ `${user.uid}`),{
        id:user.uid,
        nombre: nombre,
        apellido: apellido,
        email: email,
        empresa: empresa,
    })
    .then(()=>{
        alert('producto creado')
     })
     .catch(function () {
       alert('no se puede');
      });
  })
  .catch((error) => {
    
    console.log(error)
    
  });
    }
  return (
    <>
     <span style={{opacity:'0'}}>.</span>
    <div className='login-form' >
    <Image priority={true} className='icono-login' alt='' src='/logoNippon.png' width={220} height={65}/>
      <Image className='icono-login' alt='' src='/letraNippon.png' width={220} height={60}/>
         <form style={{display:'flex',flexDirection:'column'}} onSubmit={registrarUsuario}>
        <input className='input-login' onChange={(e)=>setNombre(e.target.value)} placeholder='Nombre'/>
        <input className='input-login' onChange={(e)=>setApellido(e.target.value)}  placeholder='Apellido'/>
        <input className='input-login' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
        <input className='input-login' onChange={(e)=>setEmpresa(e.target.value)} placeholder='Empresa'/>
        <input className='input-login' onChange={(e)=>setContrasena(e.target.value)} placeholder='Contraseña'/>
        <input className='input-login' onChange={(e)=>setClave(e.target.value)} placeholder='Clave'/>
        <button className='boton-login' type='submit'> Registrarse</button>
        </form>
        <h4> Ya tenes una cuenta? <Link href='/login'>
      <span> Inicia sesión</span> </Link> </h4>
     
    </div>
    <span style={{opacity:'0'}}>.</span>
    </>
  )
}

export default Persistence