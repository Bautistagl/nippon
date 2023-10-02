import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='contenedor-Footer'>
      <div className='footer-contenido' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className='iconos-footer'>
          <Image className='icono-footer' style={{ margin: '20px' }} width={220} height={60} alt='' priority={true} src='/logoBien.png' />
          <Image className='icono-footer2' style={{ margin: 'auto' }} width={120} height={25} alt='' src='/letrasBien.png' />
          <span> breath and flow</span>
        </div>

        <div className='grid-footer'>
          <div  className='footer-item'>
            <h3>Empresa</h3>
            <span>Inicio</span>
            <span>Nosotros</span>
            <span>Catálogo</span>
            <span>Cliente</span>
          </div>

          <div className='footer-item'>
            <h3>Contacto</h3>
            <span>Moreno, Bs. As. Argentina</span>
            <span>nippon@gmail.com</span>
            <span>54 11 5665 6565</span>
          </div>
        </div>

        <div className='footer-item'>
          <h3>¡Quiero ser distribuidor!</h3>
          <button>Empecemos</button>
        </div>
        <div className='footer-item-mobile'>
          <h3>¡Quiero ser distribuidor!</h3>
          <button>Empecemos</button>
        </div>
        
      </div>
      
    </div>
    
    </>
  )
}

export default Footer