import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebasebautista';
const LoginScreen = () => {

  const [email,setEmail] = useState('')
  const [contrasena,setContrasena] = useState('')

 const iniciarSesion = (e) => {
   e.preventDefault();

  signInWithEmailAndPassword(auth, email, contrasena)
  .then((userCredential) => {
    // Inicio de sesión exitoso, userCredential contiene información del usuario
    const user = userCredential.user;
    console.log('Usuario autenticado:', user);
  })
  .catch((error) => {
    // Error durante el inicio de sesión
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error de inicio de sesión:', errorCode, errorMessage);
  });

 }
  
  return (
    <div>
      <form onSubmit={(e)=>{iniciarSesion(e)}}>
        <input onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
        <input onChange={(e)=>setContrasena(e.target.value)} placeholder='Contraseña'/>
        <button type='submit'> Iniciar sesion</button>
      </form>

    </div>
  )
}

export default LoginScreen