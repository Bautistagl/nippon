import { get, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { db } from '@/firebasebautista';
import Catalogo from "@/components/Dashboard/Catalogobautista";
import Navbar from "@/components/Index/Navbarbautista";
import Sidebar from "@/components/Dashboard/Sidebarbautista";
import MenuMobile from "@/components/Dashboard/MenuMobilebautista";
import MobileNavbar from "@/components/Dashboard/MobileNavbarbautista";






export default function Home2 () {

    const [usuario,setUsuario] = useState('')
    const [nombre,setNombre] =useState('')
    const [mobile,setMobile] =useState(false)
  
    
    


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
      <div className="index-container">

        
       {mobile ?  <MenuMobile setMobile={setMobile}/> : <MobileNavbar setMobile={setMobile}/>}
        <div className="sidebar">
          <Sidebar/>
         
        </div>
        <div className="dashboard-content">
          <Catalogo usuario={usuario}/>
        </div>
      </div>
    );
}