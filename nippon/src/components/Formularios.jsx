import React, { useState } from 'react'
import {  createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db,app } from '@/firebasebautista';
import { ref, set } from 'firebase/database';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import back from '@/config2/axiosbautista';


const Formularios = () => {

    const [nombre,setNombre] = useState('')

    const [email,setEmail] = useState('')
    const [empresa,setEmpresa] = useState('')
    const [mensaje,setMensaje] = useState('')
 

  const mandarMail = async () =>{
    try {
      const data = {
        mail:email,
        nombre:nombre

      };
      const response = await back.post('/respuestaFormulario',data);
      if(response){
        Swal.fire({
          icon: 'success',
          title: 'Formulario enviado',
          showConfirmButton: false,
          timer:1000,
        })
        .then(()=>{
          window.location.href='/'
        })
      }
    } catch (error) {
      
      console.error(error); 
     
    }
  }

  const handleMail = (e) => {
    e.preventDefault()
    mandarMail()
  }



   
  return (
    <>
     <span style={{opacity:'0'}}>.</span>
    <div className='login-form'>
    <Image priority={true} className='icono-login' alt='' src='/logoBien.png' width={180} height={55}/>
      <Image className='icono-login' alt='' src='/letrasBien.png' width={120} height={30}/>
          <h2 style={{justifyContent:'center',color:'white'}}> Formulario para distribuidores</h2>
         <form onSubmit={handleMail} style={{display:'flex',flexDirection:'column'}}>
        <input required className='input-login' onChange={(e)=>setNombre(e.target.value)} placeholder='Nombre'/>
        <input required className='input-login' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
        <input required className='input-login' onChange={(e)=>setEmpresa(e.target.value)} placeholder='Empresa'/>
        <textarea style={{height:'150px'}} required className='input-login' onChange={(e) => setMensaje(e.target.value)} placeholder='Mensaje' />
        <button className='boton-login' type='submit'> Enviar formulario</button>
        </form>
    </div>
    <span style={{opacity:'0'}}>.</span>
    </>
  )
}

export default Formularios