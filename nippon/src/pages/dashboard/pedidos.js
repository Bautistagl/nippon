import Sidebar from "@/components/Dashboard/Sidebarbautista";
import PedidosScreen from "@/components/Dashboard/PedidosScreenbautista";
import { db } from "@/firebasebautista";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";



export default function Pedidos() {
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
          alert('nadie logeado')
        }
    
    
      },[])


    return(
       
         <div>
        <div className="sidebar">
          <Sidebar/>
         
        </div>
        <div className="dashboard-content">
        <PedidosScreen usuario={usuario}/>
        </div>
      </div>

            
       
    )
}