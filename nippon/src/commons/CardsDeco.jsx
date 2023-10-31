
import Link from 'next/link'
import React from 'react'

const CardsDeco = ({producto}) => {
  
  return (
    <div className='card'>
        <img alt='' src='/fotoProducto.png' className='card-landing-foto'/>
        <div className='info-cards-landing' >
            <h2>   {producto.nombre}  </h2>
            {producto.ancho ? <span> Ancho: {producto.ancho}  </span> : '' }
            
            <span> Base(largo):{producto.largo} </span>
            <span> Altura: {producto.alto} </span>
            <span> Capacidad: 100dm3</span>
        </div>
        <Link href="https://wa.me/1149277864/?text=Buenos" target="_blank" rel="noopener noreferrer" >
        <button>Cotización</button>
        </Link>
           
    </div>
  )
}

export default CardsDeco