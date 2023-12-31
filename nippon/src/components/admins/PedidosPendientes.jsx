import back from '@/config2/axiosbautista';
import { db } from '@/firebasebautista';
import { get, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'

const PedidosPendientesScreen = () => {
    const [pedidosData, setPedidosData] = useState([]);
    const [estado, setEstado] =useState('')

    const mostrarPedidos = async () => {
        try {
          const usuariosSnapshot = await get(ref(db, 'usuarios'));
          const pedidos = [];
      
          usuariosSnapshot.forEach((usuarioSnapshot) => {
            const pedidosSnapshot = usuarioSnapshot.child('pedidos');
      
            if (pedidosSnapshot.exists()) {
              const pedidosData = pedidosSnapshot.val();
              const pedidosUsuario = Object.values(pedidosData);
              pedidos.push(...pedidosUsuario);
            }
          });
      
          if (pedidos.length > 0) {
            setPedidosData(pedidos);
            
          } else {
            setPedidosData([]);
          }
        } catch (error) {
          console.log('Error al obtener los pedidos:', error);
        }
      };
      const borrarPedido = async (pedido) => {
        try {
          // Elimina el pedido de la base de datos
          const usuarioRef = ref(db, `usuarios/${pedido.cliente}/pedidos/${pedido.id}`);
          await remove(usuarioRef);
    
          // Actualiza el estado local eliminando el pedido
          const updatedPedidosData = pedidosData.filter((p) => p.id !== pedido.id);
          setPedidosData(updatedPedidosData);
    
          console.log('Pedido eliminado de la base de datos');
        } catch (error) {
          console.log('Error al eliminar el pedido en la base de datos:', error);
        }
      };
      useEffect(()=>{
        mostrarPedidos()
      },[])
      // const handleMail = async () => {
      //   try {
      //     const response = await back.post('/respuestaPago');
      //       // Aquí puedes manejar la respuesta si es necesario
      //   } catch (error) {
      //     console.error(error);  // Maneja cualquier error que ocurra durante la solicitud
      //   }
      // }

      const actualizarEstado = async (pedido, nuevoEstado) => {
        try {
          console.log(nuevoEstado)
          const data = {
            mail:pedido.mail,
            nombre:pedido.nombre
    
          };
          // Update the local state first
          const updatedPedidosData = pedidosData.map((p) =>
            p === pedido ? { ...p, estado: nuevoEstado } : p
          );
          setPedidosData(updatedPedidosData);
          
          if (nuevoEstado === "Armado") {
            try {
              await back.post('/respuestaPago',data);
             
            } catch (error) {
              console.log('Error al enviar la solicitud POST al servidor de armado:', error);
            }
          }
          // Update the database
          const usuarioRef = ref(db, `usuarios/${pedido.cliente}/pedidos/${pedido.id}`);
          await set(usuarioRef, { ...pedido, estado: nuevoEstado });
         
          console.log('Estado actualizado en la base de datos');
        } catch (error) {
          console.log('Error al actualizar el estado en la base de datos:', error);
        }
      };
  return (
    <>
    <div>
      <h2 style={{marginTop:'0px'}}>Lista de Pedidos</h2>
      <div className='grid-pedidos'>
        {pedidosData.map((pedido, index) => (
          <div className='pedido' key={index}>
            
            <h3>Pedido #{pedido.id}</h3>
            <h4>Productos:</h4>
          <ul>
            {pedido.productos.map((producto, productoIndex) => (
              <li key={productoIndex}>{producto.nombre} - Cantidad: {producto.cantidad}</li>
              ))}
          </ul>
            <div className='datos-pedido'>
              <p> Cliente: {pedido.nombre}</p>
              <p> Fecha: {pedido.fecha}</p>
              <p> Metodo: {pedido.metodo}</p>
              <p> Total: {pedido.total} </p>
              
              <select
                value={pedido.estado}
                onChange={(e) => actualizarEstado(pedido, e.target.value)}
              >
                <option value="Pendiente">Pago pendiente</option>
                <option value="Armado">En armado</option>
                <option value="Camino">En camino</option>
                <option value="Completado">Entregado</option>
              </select>
            <button onClick={()=>borrarPedido(pedido)}>Borrar pedido </button>
            </div>
          </div>
            
            
          
        ))}
      </div>
    </div>
  </>
  )
}

export default PedidosPendientesScreen
