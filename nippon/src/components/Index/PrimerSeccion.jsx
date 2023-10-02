import Image from 'next/image';
import React from 'react';

const PrimerSeccion = () => {
  return (
    
    <div className='primer-seccion' style={{ display: 'flex', flexDirection: 'column' }}>
    
        <Image className='icono-primer' style={{marginLeft:'60px',display:'flex',margin:'60px '}} width={220} height={60} alt='' 
        priority={true} src='/logoBien.png'/>
        <h2> Macetas. Muebles. Decohogar.</h2>
        <h1> Reinventa tus espacios </h1>
        <button> Ver Catalogo</button>
    </div>
   
  );
};

export default PrimerSeccion;
