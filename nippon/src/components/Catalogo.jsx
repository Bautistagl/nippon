import { db } from '@/firebasebautista';
import { get, push, ref, remove, set, update } from 'firebase/database';
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

      
      // AGREGAR PRODUCTO, RECIBE OBJETO PRODUCTO Y CANTIDAD
      const agregarProducto = async (producto,cantidad) => {
        const {id, nombre, precio } = producto
        try {
          const snapshot = await get(ref(db, 'usuarios/'+ `${usuario}`+'/carrito/' + nombre));
      
          if (snapshot.exists()) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            const productoEnCarrito = snapshot.val();
            const nuevaCantidad = productoEnCarrito.cantidad + cantidad;
      
            update(ref(db, 'usuarios/'+ `${usuario}`+'/carrito/' + nombre), {
              cantidad: nuevaCantidad,
            });

          } else {
            // Si el producto no está en el carrito, agrégalo como nuevo
            const productoEnCarrito = {
              nombre,
              precio: producto.precio,
              cantidad,
            };
      
            update(ref(db, 'usuarios/'+ `${usuario}`+'/carrito/' + nombre), productoEnCarrito);
          }
        updateTotalCarrito();
     
    }
    catch (error) {
      console.log('Error al agregar el producto al carrito:', error);
    }
    };


    //BORRAR PRODUCTO RECIBE OBJETO NADA MAS Y BORRA TODOS
    const borrarProducto = (producto) => {
      const { nombre } = producto
      remove(ref(db,'usuarios/' +`${usuario}/carrito/${nombre}`  ),{
          
        
      })
      updateTotalCarrito();
      
    }



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
    <>
    <h1>Catalogo</h1>
    <button onClick={()=>getSakura()}> SAKURA</button>
       <button onClick={()=>getOrigami()}> ORIGAMI</button>
       <h2>Catálogo de Productos</h2>
       {catalogData.map(producto => (
     
        <div key={producto.id}> 
          <div> {producto.nombre}</div>
          <div> {producto.precio} </div>
          <button onClick={()=>{bajarCantidad(producto.nombre)}}> - </button>
          <div>  CANTIDAD:{productoCantidad[producto.nombre]} </div>
          <button onClick={()=>{aumentarCantidad(producto.nombre)}}> + </button>
          <button onClick={()=>{agregarProducto(producto,productoCantidad[producto.nombre]) }}> Agregar a carrito</button>
          <button onClick={()=>{borrarProducto(producto) }}> Borrar Producto</button>
        </div>
      ))}
      <button onClick={()=>{finalizarCompra()}}> Finalizar compra</button>
   
      


    </>
  )
}

export default Catalogo



   {/* <div >

      <button onClick={()=>{setCantidad(cantidad -1)}}> - </button>
      <div> {cantidad} </div>
      <button onClick={()=>{setCantidad(cantidad +1)}}> + </button>
      </div> */}
