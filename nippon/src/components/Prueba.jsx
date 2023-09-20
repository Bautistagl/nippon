import { db } from '@/firebasebautista';
import { get, ref, set, update } from 'firebase/database';
import React, { useState } from 'react'
import { uid } from 'uid';

const Prueba1 = () => {

    const [precio,setPrecio] = useState('')


    
    const crearProducto = () => {
        const uuid = uid()
     set(ref(db,'productos/' + `Sakura 32`),{
        id:uuid,
        nombre: 'Sakura 32',
        precio: 30,
        color: ['Negro','Blanco','Arena','Gris','Gris Oscuro','Azul','Amarillo','Verde','Rojo'],
        ancho:'32 cm',
        largo:'12 cm',
        alto:'14 cm',
        capacidad: '150 dm3'

     })
     .then(()=>{
        alert('producto creado')
     })
     .catch(function () {
       alert('no se puede');
      });
    }

    const actualizarCarrito = () => {
        update(ref(db,'usuarios/' + `${idUsuario}/carrito`  ),{
            [idProducto]: 6,

        })
    }
    async function calcularTotalCarrito(userId) {
        
        const ref = ref(`usuarios/${userId}/carrito/`);
      
        try {
          const snapshot = await ref.once('value');
          const productos = snapshot.val();
          
          let total = 0;
      
          for (const productoId in productos) {
            const producto = productos[productoId];
            total += producto.cantidad * producto.precio;
          }
      
          return total;
        } catch (error) {
          console.error('Error al calcular el total del carrito:', error);
          return 0; // En caso de error, devuelve 0
        }
      }
      
      // Uso de la función para calcular el total del carrito
      const userId = '11FVff2xtSW16Hu2AoWbuYa7KHH2'; // Reemplaza con el ID del usuario actual
      calcularTotalCarrito(userId)
        .then(total => {
          console.log('Total del carrito:', total);
        })
        .catch(error => {
          console.error('Error al calcular el total del carrito:', error);
        });
    



  return (
    <div>
        <button onClick={crearProducto}> Crear producto</button>
        <button onClick={actualizarCarrito}> Actualizar carrito</button>
        <button onClick={()=>{calcularTotalCarrito()}}> Mostrar precio</button>
        <div> {precio} aaaaaaaaaaaaaaa</div>
    </div>
  )
}

export default Prueba1