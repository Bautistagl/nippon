import { db } from '@/firebasebautista';
import { get, ref, remove } from 'firebase/database';
import Image from 'next/image';
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
    <h2 style={{color:'white'}} >Carrito:</h2>
    {isLoading ? (
      <p>No hay productos en el carrito</p>
    ) : catalogData.length > 0 ? (
     

      <ul className='ul-pedidos'>
        {catalogData.map((productos, index) => (
           <div key={index} className='card2'>
           <Image alt='' src='/fotoEjemplo.png' width={80} height={80}/>

          <li className='li-prueba-carrito' >
            <div style={{display:'flex',flexDirection:'column'}}>  

            <h3  className='producto-carrito'> {productos.nombre}</h3>

            <div className='info-carrito' >
              {/* <span> Ancho: {productos.ancho} - </span> */}
              <div  > Altura: <span> {productos.alto} </span> - </div>
              <div > Base(largo): <span> {productos.largo} </span>  - </div>
              <div > Capacidad: <span> {productos.capacidad} </span>  </div>
            </div>

            </div>
            <div className='cantidaded-carrito'>
           
            <span> {productos.cantidad} </span>
         
            <img className='icono-borrar' alt='' src='/bin.png' onClick={()=>{borrarProducto(productos)}}/> 
            <p style={{margin:'auto',marginLeft:'10%'}}>  ${productos.precio * productos.cantidad}</p>
            </div>
        
          </li>
           </div>
        ))}
      </ul>
      
    ) : (
      <h2 style={{display:'flex',margin:'auto', justifyContent:'center', color:'white'}}>No hay productos en el carrito</h2>
    )}
    <div style={{display:'flex'}}>
      { catalogData.length>0 ? 
      <>
       <button className='boton-sidebar2'>  <Link className='link2' href='/dashboard'> Seguir comprando </Link> </button>
        <button className='boton-sidebar'> <Link className='link' href='/dashboard/checkout'> Finalizar compra </Link> </button>
      </>:
       <>
        <button className='boton-sidebar2'>  <Link className='link2' href='/dashboard'> Seguir comprando </Link> </button>
      </>
      }

    </div>
    
  </div>
  );
};

export default CarritosScreen;