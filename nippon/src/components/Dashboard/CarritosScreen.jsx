import { db } from '@/firebasebautista';
import { get, ref } from 'firebase/database';
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
  


  useEffect(() => {
    obtenerDatosDelCarrito();
  }, [catalogData]);

 

  return (
    <div>
      
    <h2>Carrito:</h2>
    {isLoading ? (
      <p>Cargando...</p>
    ) : catalogData.length > 0 ? (
      <ul className='ul-pedidos'>
        {catalogData.map((productos, index) => (
          <li key={index}>
         

            <h3>Producto: {productos.nombre}</h3>
            <p>Cantidad: {productos.cantidad}</p>
            <p> Total: {productos.precio}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>Cargando...</p>
    )}
   
  </div>
  );
};

export default CarritosScreen;