
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
            <Image className='fotos-popup-nippon' alt='' width={200} height={55} src='/logoMarronOk.png'/>
            <Image className='fotos-popup-nippon2' style={{marginTop:'-5px'}} alt='' width={130} height={25} src='/letrasMarronOk.png'/>
          </div>


           <Image className='fotos-popup-nippon3' alt='' width={260} height={85} src='/logoMercadoShops.webp'/>
        </div>
        <div className='textos-popupLand'>
           <h4> También tenemos tienda en Mercado Shops</h4> 
           <span>Mirá nuestro catálogo</span>
           <Link target="_blank"  href='https://mecaglass.mercadoshops.com.ar'>
           <button className='button-popupLand'>Ir a Mercado Shops</button> 
           </Link>
        </div>
     
    
    
      
    
    </div>
  );
};

export default PopUpLand;