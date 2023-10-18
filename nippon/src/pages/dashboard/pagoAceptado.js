import { db } from "@/firebasebautista";
import { get, push, ref, remove, set } from "firebase/database";
import moment from "moment";
import { useEffect, useState } from "react";



export default function PagoAceptado () {
    const [usuario,setUsuario] = useState('')
    const [idPedido, setIdPedido] = useState('')



    const carritoRef = ref(db, 'usuarios/' + `${usuario}` + '/carrito');
    
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
         
            // await handleMail()
       
          
        
      
           
          } else {
            console.log('No se encontraron productos en el carrito');
          }
        } catch (error) {
          console.log('Error al finalizar la compra:', error);
        }
      };

      useEffect(() => {
        const id = localStorage.getItem("userId");
    
        if (id) {
          setUsuario(id);
        } else {
          alert("Nadie logeado");
        }
      }, [usuario]); // Include 'usuario' as a dependency
    
      useEffect(() => {
        // This useEffect will run when 'usuario' changes
        if (usuario) {
          finalizarCompra();
        }
      }, [usuario]);
    return (
        <>
        </>
    )

}