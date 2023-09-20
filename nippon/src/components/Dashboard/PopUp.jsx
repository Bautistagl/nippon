import { db } from '@/firebasebautista';
import { get, push, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import axios from '../../config2/axios';
import back from '../../config2/axios';



const PopUp = ({ usuario,pago,setPago,nombre,email,telefono,envio,direccion }) => {
  const [cerrado, setCerrado] = useState(false);
  const [totalCarrito, setTotalCarrito] = useState(0);
  

  const handleCerrar = () => {
    setCerrado(true);
    setPago(false);
  };
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "MercadoPago", label: "Mercado Pago" },
    { value: "Transferencia", label: "Transferencia" },
    { value: "Deposito Bancario", label: "Deposito Bancario" },
    { value: "Efectivo", label: "Efectivo" },
  ];
  const carritoRef = ref(db, 'usuarios/' + `${usuario}` + '/carrito');

  const updateTotalCarrito = async () => {
    try {
      const snapshot = await get(carritoRef);
  
      if (snapshot.exists()) {
        const carritoData = snapshot.val();
        const productosEnCarrito = Object.values(carritoData);
        let totaCarrito = 0;
  
        productosEnCarrito.forEach(producto => {
          console.log(producto,'esto es producto')
          totaCarrito += producto.precio * producto.cantidad;
        });
  
        setTotalCarrito(totaCarrito);
        console.log(totaCarrito)
      } else {
        setTotalCarrito(0);
      }
    } catch (error) {
      console.log('Error al leer los productos del carrito:', error);
    }
  };
  const handleMail = async () => {
    try {
      const response = await back.post('/nodemailerSend');
      console.log(response.data);  // Aquí puedes manejar la respuesta si es necesario
    } catch (error) {
      console.error(error);  // Maneja cualquier error que ocurra durante la solicitud
    }
  }

  const finalizarCompra = async () => {
    
    try {
      const carritoSnapshot = await get(carritoRef);
  
      if (carritoSnapshot.exists()) {
        const carritoData = carritoSnapshot.val();
        const productosEnCarrito = Object.values(carritoData);
        const fechaActual = moment().format('MMMM Do YYYY, h:mm:ss a')
        let totalCarrito = 0;
  
        productosEnCarrito.forEach(producto => {
          totalCarrito += producto.precio * producto.cantidad;
        });
        
        const pedido = {
          id: '',
          productos: productosEnCarrito,
          total: totalCarrito,
          metodo:selectedOption,
          fecha: fechaActual,
          cliente:usuario,
          nombre:nombre,
          estado: 'En proceso',
        };
  
        // Guarda el pedido en la propiedad 'pedidos' del usuario
        const pedidosRef = ref(db, 'usuarios/'+ `${usuario}`+'/pedidos');
        const newPedidoRef = push(pedidosRef);
        const nuevoPedidoID = newPedidoRef.key;
        pedido.id = nuevoPedidoID;
        await set(newPedidoRef, pedido);
  
        // Borra los productos del carrito después de finalizar la compra
        await remove(carritoRef);
        updateTotalCarrito();
        handleMail()
    
  
        console.log('¡Compra finalizada!');
      } else {
        console.log('No se encontraron productos en el carrito');
      }
    } catch (error) {
      console.log('Error al finalizar la compra:', error);
    }
  };

  useEffect(()=>{
    updateTotalCarrito()
  },[])

  return (
    <div className="popup">
      <h1>Detalles de facturacion</h1>
      <h4> Nombre y Apellido: <span> {nombre} </span></h4>
      <h4> Email:<span>{email} </span></h4>
      <h4> Telefono:<span> {telefono} </span></h4>
      <h4> Metodo de envio:<span> {envio} </span></h4>
      <h4> Direccion<span> {direccion} </span></h4>
      <h2> Elegir metodo de pago</h2>
      {/* <h4> Comentarios:<span> {comentarios} </span></h4> */}
      <div className='botonera-popUp' >
      {options.map((option) => (
        <button
          className='button-popup'
          key={option.value}
          type="button"
          onClick={() => setSelectedOption(option.value)}
        >
          
            {option.label}
         
        </button>
      ))}
    </div>
      <h1>Total: {totalCarrito}</h1>
      <button onClick={()=>{finalizarCompra()}}> Finalizar compra</button>
      <button onClick={handleCerrar}>Cerrar</button>
    </div>
  );
};

export default PopUp;