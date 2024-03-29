import Image from 'next/image';
import React from 'react';

const DetallesPedido = ({ pedido, onClose }) => {
  return (
    <div className="detalles-pedido">
        <div style={{display:'flex',}}>

        <div>
          <h3> Pedido #{pedido.id}</h3>
          <h4>Detalle</h4>
          <p>Fecha: {pedido.fecha}</p>
          <p>Estado: {pedido.estado}</p>
          <p>Método de pago: {pedido.metodo}</p>
          <h4>Productos:</h4>
        </div>

        <div className='resumen-pedido'>
            <h4 style={{marginBottom:'5%'}}> Resumen del pedido</h4>
            <span style={{fontWeight:'bold'}}> Productos:{pedido.productos.length}</span>
            {pedido.productos.map((producto, index) => (
            <div key={index} style={{display:'flex',padding:'5px'}}>
                <div style={{display:'flex'}}>

             <h5 style={{width:'100%'}}> {producto.nombre}</h5>
             <h5>({producto.cantidad})</h5>
                </div>
             <span style={{display:'flex',marginLeft:'10%',fontSize:'0.9rem'}}>Subtotal: ${producto.cantidad*producto.precio} </span>
             </div> 
            
            
            ))}
            <h2 style={{margin:'0px',borderTop:'2px solid black'}}>Total: ${pedido.total}</h2>
        </div>

        <Image style={{cursor:'pointer'}} alt='' src='/cerrar2.png' height={30} width={30} onClick={onClose}/>
        </div>
      <ul className='ul-pedidos2'>
        {pedido.productos.map((producto, index) => (
            <div key={index} style={{display:'flex',marginTop:'2%'}}> 
            
            <Image alt='' src={producto.nombre.includes('Sakura') ? `/${producto.color}S.jpg` : `/${producto.color}O.jpg` } height={60} width={60}/>
          <div className='producto-detalle-pedido' >
            <h4> {producto.nombre}</h4>
            <div style={{display:'flex'}}>
                <span>Base(largo):{producto.largo} -</span>
            <span>Altura: {producto.alto} -</span>
            <span> Capacidad:{producto.capacidad}</span>
            </div>
            <div style={{display:'flex',fontWeight:'bold'}}>

            <p>Cantidad: {producto.cantidad}</p>
            <p>Precio unitario: ${producto.precio}</p>
            </div>
            {/* Agrega otras propiedades de producto aquí si es necesario */}
          </div>
            </div>
        ))}
      </ul>
      
      
    </div>
  );
};

export default DetallesPedido;