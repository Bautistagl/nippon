
import React, { useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';




const PopUpLand = ({abierto,setAbierto}) => {
  const router = useRouter();
  

  const [botonSeleccionado, setBotonSeleccionado] = useState("");
  
 



  return (
    <div className="popupLand">
           <Image className='boton-cerrar'  alt='' src='/cerrar2.png' height={30} width={30} onClick={()=>setAbierto(false)}/>
        <div className='fotos-popUpLand' >

          <div style={{display:'flex',flexDirection:'column',}}>
            <Image alt='' width={200} height={55} src='/logoMarronOk.png'/>
            <Image style={{marginTop:'-5px'}} alt='' width={130} height={25} src='/letrasMarronOk.png'/>
          </div>


           <Image alt='' width={300} height={105} src='/logoMercadoShops.webp'/>
        </div>
        <div className='textos-popupLand'>
           <h4> También tenemos tienda en Mercado Shops</h4> 
           <span>Mirá nuestro catálogo</span>
           <Link href='https://mecaglass.mercadoshops.com.ar'>
           <button className='button-popupLand'>Ir a Mercado Shops</button> 
           </Link>
        </div>
     
    
    
      
    
    </div>
  );
};

export default PopUpLand;