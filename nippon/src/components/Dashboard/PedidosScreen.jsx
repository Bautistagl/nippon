import { db } from '@/firebasebautista';
import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'

const PedidosScreen = ({usuario}) => {

  const [pedidosData, setPedidosData] = useState([]);
  const [pedidoSeleccionado,setPedidoSeleccionado] = useState(null)
  

const verDetallesPedido = (pedido) => {
  setPedidoSeleccionado(pedido);
};

useEffect(()=>{
 mostrarPedidos()


},[pedidosData])

const mostrarPedidos = async () => {
  try {
    const pedidosSnapshot = await get(ref(db, 'usuarios/'+ `${usuario}`+'/pedidos'));

    if (pedidosSnapshot.exists()) {
      const pedidosData = pedidosSnapshot.val();
      const pedidos = Object.values(pedidosData);

      setPedidosData(pedidos)
    } else {
      setPedidosData([])
    }
  } catch (error) {
    console.log('Error al obtener los pedidos:', error);
  }
};

  return (
    <div className='pedidosScreen'>
     <span style={{opacity:'0'}}>.</span>
    <h2>Pedidos del usuario:</h2>
    {pedidosData.length > 0 ? (
      <ul className='ul-pedidos'>
        {pedidosData.map((pedido, index) => (
          <li className='box-perdidos' key={index}>
            
            <h3>Pedido {index + 1}</h3>
            <p>Productos: {pedido.productos.length}</p>
            <p> Total: {pedido.total}</p>
            <div style={{display:'flex'}}>

            <button className='boton-sidebar' onClick={() => verDetallesPedido(pedido)}>Ver detalles</button>
            <button className='boton-sidebar' onClick={()=>{setPedidoSeleccionado(null)}}> Ver menos</button>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>Cargando...</p>
    )}
     {pedidoSeleccionado && (
        <div className='detalles-pedidos'>
          <h2>Detalles del pedido:</h2>
          <h4>Productos: </h4>
          <ul>
            {pedidoSeleccionado.productos.map((producto, index) => (
             
              <li className='detallesPedidos' key={index}>
            
                <p> <span> Nombre: </span> {producto.nombre}</p>
                <p> <span> Cantidad:</span> {producto.cantidad}</p>
                <p> <span> Subtotal:</span> {producto.precio * producto.cantidad}</p>
              </li>
           
           ))}
           <p> <span>  Total: </span>{pedidoSeleccionado.total}</p>
          </ul>
        </div>
      )}
      
  </div>
  )
}

export default PedidosScreen