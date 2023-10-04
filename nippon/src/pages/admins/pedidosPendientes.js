import MenuMobile from "@/components/Dashboard/MenuMobilebautista";
import MobileNavbar from "@/components/Dashboard/MobileNavbarbautista";
import Sidebar from "@/components/Dashboard/Sidebarbautista";
import PedidosPendientesScreen from "@/components/admins/PedidosPendientesbautista";
import { useState } from "react";



export default function PedidosPendientes () {
    const [mobile,setMobile] =useState(false)

    return(
        <>
        {mobile ?  <MenuMobile setMobile={setMobile}/> : <MobileNavbar setMobile={setMobile}/>}
        <div className="sidebar">
          <Sidebar/>
         
        </div>
        <div className="pendientes-container">

            <PedidosPendientesScreen/>
        </div>
        </>
    )

}