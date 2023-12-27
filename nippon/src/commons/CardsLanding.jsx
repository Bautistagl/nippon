import { db } from '@/firebasebautista';
import { get, ref, remove, update } from 'firebase/database';
import Link from 'next/link';
import React, { useState } from 'react'

const CardsLanding = ({producto}) => {
  const [selected,setSelected] = useState({})
  
  return (
    <div className='card'>
      
        <Link target="_blank"  href='https://mecaglass.mercadoshops.com.ar'>
        <img alt='' src={producto[0].foto} className='card-landing-foto'/>
        </Link>
        <div className='info-cards-landing' >
            <h2>   Origami  </h2> 
            <div className='container-flex'>

            <button onClick={()=>setSelected(producto[0])}>55 </button>
            <button onClick={()=>setSelected(producto[1])}>60</button>
            <button onClick={()=>setSelected(producto[2])}>92</button> 
            </div>
            {selected.ancho ? <span> Ancho: {selected.ancho}  </span> : '' }
            
            <span> Base(largo):{selected.largo} </span>
            <span> Altura: {selected.alto} </span>
            <span> Capacidad: 100dm3</span>
        </div>
   
           
    </div>
  )
}

export default CardsLanding