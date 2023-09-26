
import CheckoutScreen from "@/components/Dashboard/CheckoutScreenbautista";
import Sidebar from "@/components/Dashboard/Sidebarbautista";



export default function Checkout () {

    return(
        <>
        <div className="sidebar">
          <Sidebar/>
         
        </div>
        <div className="checkout-container">
        <CheckoutScreen/>
        </div>
        </>
    )


}