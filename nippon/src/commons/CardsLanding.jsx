import { db } from '@/firebasebautista';
import { get, ref, remove, update } from 'firebase/database';
import Link from 'next/link';
import React, { useState } from 'react'

const CardsLanding = ({producto}) => {
  
  return (
    <div className='card'>
        <Link target="_blank"  href='https://mecaglass.mercadoshops.com.ar'>
        <img alt='' src={`/${producto.foto}`} className='card-landing-foto'/>
        </Link>
        <div className='info-cards-landing' >
            <h2>   {producto.nombre}  </h2>
            {producto.ancho ? <span> Ancho: {producto.ancho}  </span> : '' }
            
            <span> Base(largo):{producto.largo} </span>
            <span> Altura: {producto.alto} </span>
            <span> Capacidad: 100dm3</span>
        </div>
   
           
    </div>
  )
}

export default CardsLanding