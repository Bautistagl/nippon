import React, { useState } from 'react'
import {  createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db,app } from '@/firebasebautista';
import { ref, set } from 'firebase/database';


const Persistence = () => {

    const [nombre,setNombre] = useState('')
    const [apellido,setApellido] = useState('')
    const [email,setEmail] = useState('')
    const [empresa,setEmpresa] = useState('')
    const [contrasena,setContrasena] = useState('')




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
    <div>
         <form onSubmit={registrarUsuario}>
        <input onChange={(e)=>setNombre(e.target.value)} placeholder='Nombre'/>
        <input onChange={(e)=>setApellido(e.target.value)}  placeholder='Apellido'/>
        <input onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
        <input onChange={(e)=>setEmpresa(e.target.value)} placeholder='Empresa'/>
        <input onChange={(e)=>setContrasena(e.target.value)} placeholder='Contraseña'/>
        <button type='submit'> OK</button>
        </form>

        <button onClick={()=>{cerrarSesion()}}> Cerrar sesion</button>
    </div>
  )
}

export default Persistence