import React, { useState } from 'react'
import {  createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db,app } from '@/firebasebautista';
import { ref, set } from 'firebase/database';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';


const Persistence = () => {

    const [nombre,setNombre] = useState('')
    const [apellido,setApellido] = useState('')
    const [email,setEmail] = useState('')
    const [empresa,setEmpresa] = useState('')
    const [contrasena,setContrasena] = useState('')
    const [clave,setClave] = useState('')



   
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
        admin:false,
    })
    .then(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Cuenta registrada',
        showConfirmButton: false,
        timer:1000,
      })
      .then(()=>{
        window.location.href='/login'
      })
     })
     .catch(function () {
       alert('no se puede');
      });
  })
  .catch((error) => {
    
    Swal.fire({
      icon: 'error',
      title: 'Ya esta en uso el email',
      showConfirmButton: false,
      timer:1000,
    })
    
  });
    }
  return (
    <>
     <span style={{opacity:'0'}}>.</span>
    <div className='login-form'>
    <Image priority={true} className='icono-login' alt='' src='/logoBien.png' width={180} height={55}/>
      <Image className='icono-login' alt='' src='/letrasBien.png' width={120} height={30}/>
         <form style={{display:'flex',flexDirection:'column'}} onSubmit={registrarUsuario}>
        <input required className='input-login' onChange={(e)=>setNombre(e.target.value)} placeholder='Nombre'/>
        <input required className='input-login' onChange={(e)=>setApellido(e.target.value)}  placeholder='Apellido'/>
        <input required className='input-login' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
        <input required className='input-login' onChange={(e)=>setEmpresa(e.target.value)} placeholder='Empresa'/>
        <input required className='input-login' onChange={(e)=>setContrasena(e.target.value)} placeholder='Contraseña'/>
        <input  className='input-login' onChange={(e)=>setClave(e.target.value)} placeholder='Clave'/>
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