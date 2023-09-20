import { db } from '@/firebasebautista';
import { get, push, ref, remove, set, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CarritoHandler = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
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




  const productosRef = ref(db, 'productos'); // Ruta de los productos en la base de datos
  const carritoRef = ref(db,'usuarios/' + `${usuario}`+'/carrito')








  // Obtiene los datos del catálogo desde la base de datos
  const getSakura = async () => {
    await get(productosRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productos = snapshot.val();
          const prodArray = Object.values(productos)
          const productosFiltrados = prodArray.filter(producto => 
            producto.nombre.includes('Sakura')
          );
          console.log(productosFiltrados)
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
    // [nombre]: productoEnCarrito,

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
const borrarProducto = (producto) => {
  const {id, nombre, precio } = producto
  remove(ref(db,'usuarios/' +`${usuario}/carrito/${nombre}`  ),{
      
    
  })
  updateTotalCarrito();
  
}
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

const verCarrito = async () => {
  try {
    const snapshot = await get(carritoRef);

    if (snapshot.exists()) {
      console.log('Productos en el carrito:', snapshot.val());
    } else {
      console.log('No se encontraron productos en el carrito');
    }

    // Actualiza el total del carrito
    updateTotalCarrito();
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
      updateTotalCarrito();

      console.log('¡Compra finalizada!');
    } else {
      console.log('No se encontraron productos en el carrito');
    }
  } catch (error) {
    console.log('Error al finalizar la compra:', error);
  }
};


const mostrarPedidos = async () => {
  try {
    const pedidosSnapshot = await get(ref(db, 'usuarios/'+ `${usuario}`+'/pedidos'));

    if (pedidosSnapshot.exists()) {
      const pedidosData = pedidosSnapshot.val();
      const pedidos = Object.values(pedidosData);

      console.log('Pedidos del usuario:', pedidos);
    } else {
      console.log('No se encontraron pedidos para el usuario');
    }
  } catch (error) {
    console.log('Error al obtener los pedidos:', error);
  }
};


  return (
    <div>
      <h1> Bienvenido {nombre}</h1>
      <ul>
        <li>Catalogo</li>
        <li>Carrito</li>
        <li>Pedidos</li>
        <li>Facturas</li>
      </ul>
       <button onClick={()=>getSakura()}> SAKURA</button>
       <button onClick={()=>getOrigami()}> ORIGAMI</button>
       <h2>Catálogo de Productos</h2>
       {catalogData.map(producto => (

        <div key={producto.id}> 
          <div> {producto.nombre}</div>
          <div> {producto.precio} </div>
          <button onClick={()=>{agregarProducto(producto,1) }}> Agregar a carrito</button>
          <button onClick={()=>{borrarProducto(producto,3) }}> Borrar Producto</button>
        </div>
      ))}
      <button onClick={()=>{verCarrito()}}> Mostrar carrito </button>
      <div>Total del carrito: ${totalCarrito.toFixed(2)}</div>
      <button onClick={() => finalizarCompra()}>Finalizar compra</button>
      <button onClick={() => mostrarPedidos()}>Mostrar pedidos</button>
        
    </div>
  )
}

export default CarritoHandler