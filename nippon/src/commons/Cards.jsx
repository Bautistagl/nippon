import { db } from '@/firebasebautista';
import { get, ref, remove, update } from 'firebase/database';
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const Cards = ({producto,usuario}) => {
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

  
  // AGREGAR PRODUCTO, RECIBE OBJETO PRODUCTO Y CANTIDAD
  const agregarProducto = async (producto,cantidad) => {
    const {id, nombre, precio } = producto
    try {
      const snapshot = await get(ref(db, 'usuarios/'+ `${usuario}`+'/carrito/' + nombre));
      const updatedCantidad = { ...productoCantidad };
      if (snapshot.exists()) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        const productoEnCarrito = snapshot.val();
        const nuevaCantidad = productoEnCarrito.cantidad + cantidad;
  
        update(ref(db, 'usuarios/'+ `${usuario}`+'/carrito/' + nombre), {
          cantidad: nuevaCantidad,
        });
        updatedCantidad[nombre] = 0
        setProductoCantidad(updatedCantidad)
      } else {
        // Si el producto no está en el carrito, agrégalo como nuevo
        const updatedCantidad = { ...productoCantidad };
        const productoEnCarrito = {
          nombre,
          precio: producto.precio,
          cantidad,
        };
  
        update(ref(db, 'usuarios/'+ `${usuario}`+'/carrito/' + nombre), productoEnCarrito);
        updatedCantidad[nombre] = 0
        setProductoCantidad(updatedCantidad)
      }
    updateTotalCarrito();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer:1000,
    
      customClass: {
        confirmButton: 'confirm-button-class',
        title: 'title-class',
        icon: 'icon-class'
      },
      
    })
    
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

  return (
    <div className='card'>
        <img alt='' src='/fotoProducto.png'/>
        <div className='info-cards-landing'>
            <h2>   {producto.nombre}  </h2>
            {producto.ancho ? <span> Ancho: {producto.ancho}  </span> : '' }
            
            <span> Base(largo):{producto.largo} </span>
            <span> Altura: {producto.alto} </span>
            <span> Capacidad: 100dm3</span>
        </div>
        <div className='botonera-cantidad'>

        <button onClick={()=>{bajarCantidad(producto.nombre)}}> - </button>
          <div>  CANTIDAD:{productoCantidad[producto.nombre]} </div>
          <button onClick={()=>{aumentarCantidad(producto.nombre)}}> + </button>
        </div>
            <button className='agregar-button' onClick={()=>{agregarProducto(producto,productoCantidad[producto.nombre])}}> Agregar al carrito</button>
    </div>
  )
}

export default Cards