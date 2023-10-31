
import CardsDeco from '@/commons/CardsDecobautista';
import CardsLanding from '@/commons/CardsLandingbautista';
import Cards from '@/commons/Cardsbautista'
import { db } from '@/firebasebautista';
import { get, ref } from 'firebase/database';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CatalogoDeco = ({usuario}) => {
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


   
    useEffect(()=>{
        getSakura()
      },[])
  return (
    <div className='contenedor-catalogo'>
      <h1>Decoración</h1>
     
     
      <div className='contenedor-cards'>

      {catalogData.map(producto => (
     
     <div className='cards-importadas' key={producto.id}> 
     <CardsDeco producto={producto} />
  
     </div>
   ))}
      </div>

    </div>
  )
}

export default CatalogoDeco