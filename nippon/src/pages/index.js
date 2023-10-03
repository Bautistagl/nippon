import CasiFooter from "@/components/Index/CasiFooterbautista";
import Catalogo from "@/components/Index/Catalogobautista";
import Diseno from "@/components/Index/Disenobautista";
import Footer from "@/components/Index/Footerbautista";
import GridLanding from "@/components/Index/GridLandingbautista";
import Iconos from "@/components/Index/Iconosbautista";

import Navbar from "@/components/Index/Navbarbautista";
import PrimerSeccion from "@/components/Index/PrimerSeccionbautista";
import Secciones from "@/components/Index/Seccionesbautista";
import { db } from "@/firebasebautista";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'




export default function Home() {
  const [usuario,setUsuario] = useState('')
  const [nombre,setNombre] =useState('')

  
  


  useEffect(()=>{
    
    const id = localStorage.getItem('userId')
    if(id){
      setUsuario(id)
      get(ref(db,'usuarios/'+`${id}`))
      .then((snapshot)=>{
        if(snapshot.exists()){
          const usuarioLog = snapshot.val();
        setNombre(usuarioLog.nombre)
        }
      })
    }
    else{
      
    }
    const tiempoEspera = 15000; // 15 segundos (en milisegundos)
    
    const timeoutId = setTimeout(() => {

      Swal.fire({
        icon: 'question',
        title: 'Tambien tenemos tienda en mercadoShops',
        text: 'Mira nuestro catalogo en mercadoShops',
        footer: '<a href="https://www.mercadolibre.com.ar/">Ir a mercadoShops</a>'
      })
      
    }, tiempoEspera);

  
    return () => clearTimeout(timeoutId);


  },[])
  return (
    <>
    <Navbar usuario={usuario}/>
    <PrimerSeccion/>
    <Diseno/>
    <GridLanding/>
    <Secciones/>
    <Catalogo usuario={usuario}/>
    {/* <Iconos/> */}
    {/* <CasiFooter/> */}
    <Footer/>
      
    </>
  )
}
