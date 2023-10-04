import React, { useEffect, useState } from 'react';
import { db } from '@/firebasebautista';
import { get, ref } from 'firebase/database';
import DetallesPedido from './DetallesPedido'; // Asegúrate de importar el componente de detalles

const PedidosScreen = ({ usuario }) => {
  const [pedidosData, setPedidosData] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const verDetallesPedido = (pedido) => {
    setPedidoSeleccionado(pedido);
    setModalVisible(true); // Mostrar el modal al hacer clic en "Ver compra"
  };

  const cerrarDetallesPedido = () => {
    setPedidoSeleccionado(null);
    setModalVisible(false); // Ocultar el modal al cerrar
  };

  useEffect(() => {
    mostrarPedidos();
  }, [pedidosData]);

  const mostrarPedidos = async () => {
    try {
      const pedidosSnapshot = await get(
        ref(db, 'usuarios/' + `${usuario}` + '/pedidos')
      );

      if (pedidosSnapshot.exists()) {
        const pedidosData = pedidosSnapshot.val();
        const pedidos = Object.values(pedidosData);

        setPedidosData(pedidos);
      } else {
        setPedidosData([]);
      }
    } catch (error) {
      console.log('Error al obtener los pedidos:', error);
    }
  };

  return (
    <div className="pedidosScreen">
      <span style={{ opacity: '0' }}>.</span>
      <h2 style={{ color: 'white' }}>Mis pedidos:</h2>

      {modalVisible && pedidoSeleccionado ?
        <DetallesPedido pedido={pedidoSeleccionado} onClose={cerrarDetallesPedido} />
        :
      
      <div>

      {pedidosData.length > 0 ? (
        <ul className="ul-pedidos">
          <div className="pedido-header">
            <span> Pedido # </span>
            <span> Fecha</span>
            <span> Productos</span>
            <span> Total del pedido</span>
            <span> Estado del pedido</span>
            <span>-</span>
          </div>
          {pedidosData.map((pedido, index) => (
            <div key={index}>
              <div className="pedido-data">
                <p>{index + 1}</p>
                <p>{pedido.fecha}</p>
                <p> {pedido.productos.length}</p>
                <p> ${pedido.total}</p>
                <p> {pedido.estado}</p>
                <p
                  style={{ color: '#DAA666', cursor: 'pointer' }}
                  onClick={() => verDetallesPedido(pedido)}
                >
                  Ver compra
                </p>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>Cargando...</p>
      )}
      </div>
      }

    </div>
  );
};

export default PedidosScreen;