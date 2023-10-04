import { db } from '@/firebasebautista';
import { get, ref, set } from 'firebase/database';
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
            console.log(pedidosData)
          } else {
            setPedidosData([]);
          }
        } catch (error) {
          console.log('Error al obtener los pedidos:', error);
        }
      };
      useEffect(()=>{
        mostrarPedidos()
      },[])
      const handleMail = async () => {
        try {
          const response = await back.post('/nodemailerSend');
          console.log(response.data);  // Aquí puedes manejar la respuesta si es necesario
        } catch (error) {
          console.error(error);  // Maneja cualquier error que ocurra durante la solicitud
        }
      }

      const actualizarEstado = async (pedido, nuevoEstado) => {
        try {
          // Update the local state first
          const updatedPedidosData = pedidosData.map((p) =>
            p === pedido ? { ...p, estado: nuevoEstado } : p
          );
          setPedidosData(updatedPedidosData);
    
          // Update the database
          const usuarioRef = ref(db, `usuarios/${pedido.cliente}/pedidos/${pedido.id}`);
          await set(usuarioRef, { ...pedido, estado: nuevoEstado });
          handleMail()
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
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}

export default PedidosPendientesScreen
