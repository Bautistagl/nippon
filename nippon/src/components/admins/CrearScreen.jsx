import { db } from '@/firebasebautista';
import { ref, set } from 'firebase/database';
import React, { useState } from 'react'
import { uid } from 'uid';

const CrearScreen = () => {

    const [nombre, setNombre] =useState('')
    const [precio, setPrecio] =useState('')
    const [ancho, setAncho] =useState('')
    const [largo, setLargo] =useState('')
    const [alto, setAlto] =useState('')
    const [capacidad, setCapacidad] =useState('')


    const crearProducto = (e) => {
      e.preventDefault()
        const uuid = uid()
     set(ref(db,'productos/' + `${nombre}`),{
        id:uuid,
        nombre: nombre,
        precio: precio,
        color: ['Negro','Blanco','Arena','Gris','Gris Oscuro','Azul','Amarillo','Verde','Rojo'],
        ancho:ancho,
        largo:largo,
        alto:alto,
        capacidad: capacidad

     })
     .then(()=>{
        alert('producto creado')
     })
     .catch(function () {
       alert('no se puede');
      });
    }
  return (
    <div>
      <form onSubmit={(e)=>(crearProducto(e))}>

        <input onChange={(e)=>setNombre(e.target.value)} placeholder='Nombre'/>
        <input onChange={(e)=>setPrecio(e.target.value)} placeholder='Precio'/>
        <input onChange={(e)=>setAncho(e.target.value)} placeholder='Ancho'/>
        <input onChange={(e)=>setLargo(e.target.value)} placeholder='Largo'/>
        <input onChange={(e)=>setAlto(e.target.value)} placeholder='Alto'/>
        <input onChange={(e)=>setCapacidad(e.target.value)} placeholder='Capacidad'/>
    <button type='submit'> Crear producto</button>
      </form>

    </div>
  )
}

export default CrearScreen