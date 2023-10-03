import { db } from '@/firebasebautista';
import { get, push, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import axios from '../../config2/axios';
import back from '../../config2/axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import BotonPrueba from './MercadoPago';
import Link from 'next/link';



const PopUp = ({ usuario,pago,setPago,nombre,email,telefono,envio,direccion }) => {
  const router = useRouter();
  const [cerrado, setCerrado] = useState(false);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [botonSeleccionado, setBotonSeleccionado] = useState("");
  const [usuario2, setUsuario2] = useState('')
  const [idPedido, setIdPedido] = useState('')
 

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
          
          totaCarrito += producto.precio * producto.cantidad;
        });
  
        setTotalCarrito(totaCarrito);
        
      } else {
        setTotalCarrito(0);
      }
    } catch (error) {
      console.log('Error al leer los productos del carrito:', error);
    }
  };
  const handleMail = async () => {
    try {
      const mailUsuario = {
        mail:usuario2
      };
      const response = await back.post('/nodemailerSend', mailUsuario);
      console.log(response,'AAAAAAA')
    } catch (error) {
      console.log('ESTO ES ERROR EN TERMINAR COMPRA')
      console.error(error); 
     
    }
  };

  const finalizarCompra = async () => {
    
    try {
      const carritoSnapshot = await get(carritoRef);
  
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
          metodo:selectedOption,
          fecha: fechaActual,
          cliente:usuario,
          nombre:nombre,
          estado: 'Pago pendiente',
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
        updateTotalCarrito();
        // await handleMail()
   
      
    
  
       
      } else {
        console.log('No se encontraron productos en el carrito');
      }
    } catch (error) {
      console.log('Error al finalizar la compra:', error);
    }
  };
  const handleButton = (option) =>{
    setSelectedOption(option);
    setBotonSeleccionado(option);
  }

  useEffect(()=>{
    updateTotalCarrito()
    const id = localStorage.getItem('email')
    if(id){
      setUsuario2(id)
      
    }
    else{
      alert('nadie logeado')
    }
    
  },[])

  return (
    <div className="popup">
      <h1>Detalles de facturacion</h1>

      <div style={{display:'flex'}}>
      <h4> Nombre y Apellido: </h4> 
      <span> {nombre} </span>
      </div>

      <div style={{display:'flex'}}>
       <h4> Email:</h4>
       <span>{email} </span>
      </div>

      <div style={{display:'flex'}}>
       <h4> Telefono:</h4>
       <span> {telefono} </span>
      </div>

      <div style={{display:'flex'}}>
       <h4> Metodo de envio:</h4>
       <span> {envio} </span>
      </div>

      <div style={{display:'flex'}}>
       <h4> Direccion:</h4>
       <span>{direccion} </span>
      </div>
      <h2> Elegir metodo de pago</h2>
      {/* <h4> Comentarios:<span> {comentarios} </span></h4> */}
      <div className='botonera-popUp' >
      {options.map((option) => (
        <button
        className={botonSeleccionado === option.value ? 'button-popup-select' : 'button-popup'}
          key={option.value}
          type="button"
          onClick={() =>handleButton(option.value) }
        >
          
            {option.label}
         
        </button>
      ))}
    </div>
      <h1 >Total: {totalCarrito}</h1>
      <div style={{display:'flex',justifyContent:'center'}}>
      <button className='button-popup2' onClick={()=>{finalizarCompra()}}> Finalizar compra</button>
      {totalCarrito &&  <BotonPrueba finalizarCompra={finalizarCompra}   precio={totalCarrito} /> }
     
      <button className='button-popup2' onClick={handleCerrar}>Volver</button>
      </div>
    </div>
  );
};

export default PopUp;