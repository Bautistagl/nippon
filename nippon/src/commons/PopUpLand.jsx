
import React, { useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';




const PopUpLand = () => {
  const router = useRouter();
  

  const [botonSeleccionado, setBotonSeleccionado] = useState("");
  
 



  return (
    <div className="popupLand">
        <div style={{display:'flex',margin:'auto',justifyContent:'center'}}>

      <div style={{display:'flex',flexDirection:'column',}}>
        <Image style={{margin:'10px'}} alt='' width={200} height={55} src='/logoMarronOk.png'/>
        <Image  style={{margin:'10px',marginLeft:'45px'}} alt='' width={130} height={25} src='/letrasMarronOk.png'/>
      </div>
      <Image  style={{margin:'10px'}} alt='' width={300} height={105} src='/logoMercadoShops.webp'/>
        </div>

        <div className='textos-popupLand'>
           <h4> También tenemos tienda en Mercado Shops</h4> 
           <span>Mirá nuestro catálogo</span>
           <button className='button-popupLand'>Ir a Mercado Shops</button> 
        </div>
     
    
    
      
    
    </div>
  );
};

export default PopUpLand;