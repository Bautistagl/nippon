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
    <h2 style={{color:'white'}}>Mis pedidos:</h2>
   
    {pedidosData.length > 0 ? (
      
      <ul className='ul-pedidos'>
         <div className='pedido-header'>
      <span> Pedido # </span>
      <span> Fecha</span>
      <span> Productos</span>
      <span> Total del pedido</span>
      <span> Estado del pedido</span>
      <span>-</span>

    </div>
        {pedidosData.map((pedido, index) => (
          <div  key={index}>
             <div className='pedido-data'>
            <p>{index + 1}</p>
            <p>{pedido.fecha}</p>
            <p> {pedido.productos.length}</p>
            <p> ${pedido.total}</p>
            <p> {pedido.estado}</p>
            <p style={{color:'#DAA666', cursor:'pointer'}} > Ver compra</p>
            {/* <div style={{display:'flex'}}>

            <button className='boton-sidebar3' onClick={() => verDetallesPedido(pedido)}>Ver detalles</button>
            <button className='boton-sidebar3' onClick={()=>{setPedidoSeleccionado(null)}}> Ver menos</button>
            </div> */}
             </div>
          </div>
        ))}
      </ul>
    ) : (
      <p>Cargando...</p>
    )}
  
      
  </div>
  )
}

export default PedidosScreen