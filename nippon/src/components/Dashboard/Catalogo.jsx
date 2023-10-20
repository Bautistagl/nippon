
import CardsLanding from '@/commons/CardsLandingbautista';
import Cards from '@/commons/Cardsbautista'
import { db } from '@/firebasebautista';
import { get, push, ref, remove, set } from 'firebase/database';
import Image from 'next/image'
import React, { useState } from 'react'

const Catalogo = ({usuario}) => {
  const [catalogData, setCatalogData] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [cantidad,setCantidad] =useState(0)
  const [productoCantidad, setProductoCantidad] = useState({
    'Sakura 32':0,
    'Sakura 48':0,
    'Sakura 64':0,
    'Sakura 100':0,
    'Origami 55':0,
    'Origami 60':0,
    'Origami 92':0,
  })
  const productosRef = ref(db, 'productos'); 
  const carritoRef = ref(db,'usuarios/' + `${usuario}`+'/carrito')


  const aumentarCantidad = (nombre) => {
    const updatedCantidad = { ...productoCantidad };
    updatedCantidad[nombre] ++
    setProductoCantidad(updatedCantidad);

  }
  const bajarCantidad = (nombre) => {
    const updatedCantidad = { ...productoCantidad };
    if(updatedCantidad[nombre] >0){
      updatedCantidad[nombre] --
    }
   
    setProductoCantidad(updatedCantidad);

  }

  const getSakura = async () => {
      
      await get(productosRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const productos = snapshot.val();
            const prodArray = Object.values(productos)
            const productosFiltrados = prodArray.filter(producto => 
              producto.nombre.includes('Sakura')
            );
           
            setCatalogData(productosFiltrados);
          } else {
            console.log('No se encontraron productos en la rama especificada');
          }
        })
        .catch((error) => {
          console.log('Error al leer los productos:', error);
        });
  
     
    };


    const getOrigami = async () => {
      await get(productosRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const productos = snapshot.val();
            const prodArray = Object.values(productos)
            const productosFiltrados = prodArray.filter(producto => 
              producto.nombre.includes('Origami')
            );
            
            setCatalogData(productosFiltrados);
          } else {
            console.log('No se encontraron productos en la rama especificada');
          }
        })
        .catch((error) => {
          console.log('Error al leer los productos:', error);
        });
  
      
    };
    const updateTotalCarrito = async () => {
        try {
          const snapshot = await get(carritoRef);
      
          if (snapshot.exists()) {
            const carritoData = snapshot.val();
            const productosEnCarrito = Object.values(carritoData);
            let totalCarrito = 0;
      
            productosEnCarrito.forEach(producto => {
              totalCarrito += producto.precio * producto.cantidad;
            });
      
            setTotalCarrito(totalCarrito);
          } else {
            setTotalCarrito(0);
          }
        } catch (error) {
          console.log('Error al leer los productos del carrito:', error);
        }
      };

    const finalizarCompra = async () => {
        try {
          const carritoSnapshot = await get(carritoRef);
      
          if (carritoSnapshot.exists()) {
            const carritoData = carritoSnapshot.val();
            const productosEnCarrito = Object.values(carritoData);
            const fechaActual = new Date().toISOString();
            let totalCarrito = 0;
      
            productosEnCarrito.forEach(producto => {
              totalCarrito += producto.precio * producto.cantidad;
            });
      
            const pedido = {
              productos: productosEnCarrito,
              total: totalCarrito,
              fecha: fechaActual,
              estado: 'En proceso',
            };
      
            // Guarda el pedido en la propiedad 'pedidos' del usuario
            const pedidosRef = ref(db, 'usuarios/'+ `${usuario}`+'/pedidos');
            const newPedidoRef = push(pedidosRef);
            await set(newPedidoRef, pedido);
      
            // Borra los productos del carrito después de finalizar la compra
            await remove(carritoRef);
      
            // Actualiza el total del carrito
            setProductoCantidad({
              'Sakura 32':0,
              'Sakura 48':0,
              'Sakura 64':0,
              'Sakura 100':0,
              'Origami 55':0,
              'Origami 60':0,
              'Origami 92':0,
            })
            console.log(productoCantidad)
            updateTotalCarrito();
      
            console.log('¡Compra finalizada!');
          } else {
            console.log('No se encontraron productos en el carrito');
          }
        } catch (error) {
          console.log('Error al finalizar la compra:', error);
        }
      };
  return (
    <div className='contenedor-catalogo'>
      <h1>Productos</h1>
      <span>Selecciona un modelo</span>
      <div style={{display:'flex',margin:'auto'}}>

       <div className='ejemplo-catalogo'> 
       <Image onClick={()=>getOrigami()} style={{marginLeft:'50px',display:'flex',margin:'60px auto'}} width={120} height={70} alt='' src='/Sakura.png'/>
        <span> Origami</span>
       </div>
       <div className='ejemplo-catalogo' >
       <Image onClick={()=>getSakura()} style={{marginLeft:'50px',display:'flex',margin:'60px auto'}} width={50.2} height={90} alt='' src='/Origami.png'/>
        <span> Sakura</span>
       </div>
      
      </div>
      <div className='contenedor-cards'>

      {catalogData.map(producto => (
     
     <div className='cards-importadas' key={producto.id}> 
     <Cards usuario={usuario} producto={producto} />
  
     </div>
   ))}
      </div>
  

    </div>
  )
}

export default Catalogo