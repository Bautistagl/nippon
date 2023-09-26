
import CheckoutScreen from "@/components/Dashboard/CheckoutScreenbautista";
import MenuMobile from "@/components/Dashboard/MenuMobilebautista";
import MobileNavbar from "@/components/Dashboard/MobileNavbarbautista";
import Sidebar from "@/components/Dashboard/Sidebarbautista";
import { useState } from "react";



export default function Checkout () {
  const [mobile,setMobile] =useState(false)
    return(
        <>
        {mobile ?  <MenuMobile setMobile={setMobile}/> : <MobileNavbar setMobile={setMobile}/>}
        <div className="sidebar">
          <Sidebar/>
         
        </div>
        <div className="checkout-container">
        <CheckoutScreen/>
        </div>
        </>
    )


}