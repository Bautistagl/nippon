import PopUpLand from "@/commons/PopUpLandbautista";
import CatalogoDeco from "@/components/CatalogoDecobautista";
import Catalogo from "@/components/Index/Catalogobautista";
import Footer from "@/components/Index/Footerbautista"
import Navbar from "@/components/Index/Navbarbautista";
import PrimerSeccion from "@/components/Index/PrimerSeccionbautista";
import { db } from "@/firebasebautista";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";




export default function Decoracion() {
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
   

  
    


  },[])
  return (
    <>
   
    <Navbar usuario={usuario}/>
    <div className="whatsapp-icon">
        <a href="https://wa.me/1149277864/?text=Buenos Dias" target="_blank" rel="noopener noreferrer">
          <img src="/logoWhatsapp.png" alt="WhatsApp" />
        </a>
      </div>
    <CatalogoDeco usuario={usuario}/>
    <Footer/>
      
    </>
  )
}
