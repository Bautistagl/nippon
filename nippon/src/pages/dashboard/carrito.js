import CarritosScreen from "@/components/Dashboard/CarritosScreenbautista";
import Sidebar from "@/components/Dashboard/Sidebarbautista";
import { db } from "@/firebasebautista";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";


export default function Carrito() {


    const [usuario,setUsuario] = useState('')
    const [nombre,setNombre] =useState('')
    

    const carritoRef = ref(db,'usuarios/' + `${usuario}`+'/carrito')
    useEffect(()=>{
        const id = localStorage.getItem('userId')
        if(id){
          setUsuario(id)
          
        }
        else{
          alert('nadie logeado')
        }

   
       
    
    
      },[])

    return(
        <div>
        <div className="sidebar">
          <Sidebar/>
         
        </div>
        <div className="dashboard-content">
        <CarritosScreen  usuario={usuario}/>
        </div>
      </div>
    )
}