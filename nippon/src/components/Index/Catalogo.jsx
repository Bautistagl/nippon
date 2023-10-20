
import CardsLanding from '@/commons/CardsLandingbautista';
import Cards from '@/commons/Cardsbautista'
import { db } from '@/firebasebautista';
import { get, ref } from 'firebase/database';
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
  return (
    <div className='contenedor-catalogo'>
      <h1>Productos</h1>
      <span>Selecciona un modelo</span>
      <div className='contenedor-iconos-catalogo' >

       <div className='ejemplo-catalogo'> 
       <Image onClick={()=>getOrigami()} style={{marginRight:'100%',display:'flex',margin:'auto '}} width={160} height={80} alt='' src='/Sakura.png'/>
        <span> Origami</span>
       </div>
       <div className='ejemplo-catalogo' >
       <Image onClick={()=>getSakura()} style={{marginLeft:'100%',display:'flex',margin:' auto'}} width={50.5} height={92} alt='' src='/Origami.png'/>
        <span> Sakura</span>
       </div>
      
      </div>
      <div className='contenedor-cards'>

      {catalogData.map(producto => (
     
     <div className='cards-importadas' key={producto.id}> 
     <CardsLanding producto={producto} />
  
     </div>
   ))}
      </div>

    </div>
  )
}

export default Catalogo