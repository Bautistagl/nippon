import { db } from '@/firebasebautista';
import { get, ref, remove } from 'firebase/database';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CarritosScreen = ({ usuario, productos }) => {
  const [catalogData, setCatalogData] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const carritoRef = ref(db, 'usuarios/' + `${usuario}` + '/carrito');

  const obtenerDatosDelCarrito = async () => {
    try {
      const snapshot = await get(carritoRef);

      if (snapshot.exists()) {
        const carritoData = snapshot.val();
        const prods = Object.values(carritoData);

        setCatalogData(prods);
      } else {
        setCatalogData([])
      }

      // Actualiza el total del carrito
    //   updateTotalCarrito();
    } catch (error) {
      console.log('Error al leer los productos del carrito:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const borrarProducto = (producto) => {
    const { nombre } = producto
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
  


  useEffect(() => {
    obtenerDatosDelCarrito();
  }, [catalogData]);

 

  return (
    <div >
      <span style={{opacity:'0'}}>.</span>
    <h2 >Carrito:</h2>
    {isLoading ? (
      <p>Cargando...</p>
    ) : catalogData.length > 0 ? (
     

      <ul className='ul-pedidos'>
        {catalogData.map((productos, index) => (
           <div className='card2'>

          <li key={index}>
         

            <h3>Producto: {productos.nombre}</h3>
            <p>Cantidad: {productos.cantidad}</p>
            <p> Total: {productos.precio * productos.cantidad}</p>
            <button onClick={()=>{borrarProducto(productos)}}> Borrar prod</button>
          </li>
           </div>
        ))}
      </ul>
      
    ) : (
      <p>Cargando...</p>
    )}
    <Link href='/dashboard/checkout'>
      <button className='boton-sidebar'> Finalizar Compra </button>
    </Link>
  </div>
  );
};

export default CarritosScreen;