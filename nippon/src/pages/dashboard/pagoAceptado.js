import AvisoPago from "@/commons/avisoPagobautista";
import MenuMobile from "@/components/Dashboard/MenuMobilebautista";
import MobileNavbar from "@/components/Dashboard/MobileNavbarbautista";
import Sidebar from "@/components/Dashboard/Sidebarbautista";
import back from "@/config2/axiosbautista";
import { db } from "@/firebasebautista";
import { get, push, ref, remove, set } from "firebase/database";
import moment from "moment";
import { useEffect, useState } from "react";



export default function PagoAceptado () {
    const [usuario,setUsuario] = useState('')
    const [idPedido, setIdPedido] = useState('')
    const [mobile,setMobile] =useState(false)
    const [email,setEmail] = useState('')


   

    const carritoRef = ref(db, 'usuarios/' + `${usuario}` + '/carrito');
    // Esto maneja el aviso del nuevo pedido a nippon
    const handleNippon = async () => {
      try {
        
        const response = await back.post('/nodemailerSend');
   
      } catch (error) {
        console.error(error);  
      }
    }

    // Esto maneja el aviso de pago aceptado al cliente
    const handleCliente = async () => {
      try {
        
        const response = await back.post('/pagoCheck',email);
   
      } catch (error) {
        console.error(error);  
      }
    }
    
    const finalizarCompra = async () => {
        
        try {
          const carritoSnapshot = await get(carritoRef);
          console.log(carritoSnapshot)
          if (carritoSnapshot.exists()) {
            const carritoData = carritoSnapshot.val();
            const productosEnCarrito = Object.values(carritoData);
            const fechaActual = moment().format('DD/MM/YYYY')
            let totalCarrito = 0;
      
            productosEnCarrito.forEach(producto => {
              totalCarrito += producto.precio * producto.cantidad;
            });
            
            const pedido = {
              id: '',
              productos: productosEnCarrito,
              total: totalCarrito,
              metodo:'Mercado Pago',
              fecha: fechaActual,
              cliente:usuario,
              
              estado: 'En armado',
            };
      
            // Guarda el pedido en la propiedad 'pedidos' del usuario
            const pedidosRef = ref(db, 'usuarios/'+ `${usuario}`+'/pedidos');
            const newPedidoRef = push(pedidosRef);
            const nuevoPedidoID = newPedidoRef.key;
            setIdPedido(nuevoPedidoID)
            pedido.id = nuevoPedidoID;
            await set(newPedidoRef, pedido);
            
            // Borra los productos del carrito después de finalizar la compra
            await remove(carritoRef);
         
            await handleNippon()
            await handleCliente()
       
          
        
      
           
          } else {
            console.log('No se encontraron productos en el carrito');
          }
        } catch (error) {
          console.log('Error al finalizar la compra:', error);
        }
      };

      useEffect(() => {
        const id = localStorage.getItem("userId");
        const mail = localStorage.getItem("emailNippon");
        setEmail(mail)
        if (id) {
          setUsuario(id);
        } else {
          alert("Nadie logeado");
        }
      }, [usuario]); // Include 'usuario' as a dependency
    
      useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get("status");
        // This useEffect will run when 'usuario' changes
        if (usuario && status === "approved") {
          finalizarCompra();
        }
      }, [usuario]);


    return (
        <>
        <div className="index-container">

        
{mobile ?  <MenuMobile setMobile={setMobile}/> : <MobileNavbar setMobile={setMobile}/>}
 <div className="sidebar">
   <Sidebar/>
  
 </div>
 <div className="dashboard-content">
   <AvisoPago/>
 </div>
</div>
        </>
    )

}