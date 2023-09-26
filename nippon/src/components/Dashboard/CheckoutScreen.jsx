import React, { useEffect, useState } from 'react'
import PopUp from './PopUp'

const CheckoutScreen = () => {
    const [nombreapellido, setNombreapellido] = useState('')
    const [email, setEmail] =useState('')
    const [telefono, setTelefono] =useState('')
    const [metodo,setMetodo] = useState('Correo Argentino GBA')
    const [direccion, setDireccion] = useState('')
    const [pago,setPago] =useState(false)
    const [usuario,setUsuario] = useState('')

    
    useEffect(()=>{
      const id = localStorage.getItem('userId')
      if(id){
        setUsuario(id)
        
      }
      else{
        alert('nadie logeado')
      }
    },[])

  
  return (
    <div className='checkout-screen'>
      <div className={ pago ? 'blureado':''}>

        <h2> Datos de facturacion:</h2>
        <label> Nombre y Apellido </label>
        <input onChange={(e)=> setNombreapellido(e.target.value)}/>
        <label> Email </label>
        <input onChange={(e)=> setEmail(e.target.value)}/>
        <label> Telefono </label>
        <input onChange={(e)=> setTelefono(e.target.value)}/>
        <label> Metodo de envio </label>
        <select
        value={metodo}
        onChange={(e) => setMetodo(e.target.value)}
        >
            <option value='Correo Argentino GBA'> Correo Argentino GBA</option>
            <option value='Retiro por local'> Retiro por local</option>
        </select>
        <label> Direccion de envio </label>
        <input onChange={(e)=> setDireccion(e.target.value)}/>
        <label> Comentarios extras  </label>
        <input/>
        <button className='button-checkout' onClick={()=>setPago(true)}> Ir al pago </button>
      </div>
        {pago ? (
        <PopUp usuario={usuario} nombre={nombreapellido} email={email} telefono={telefono}
        envio={metodo} direccion={direccion}  setPago={setPago} pago={pago} />
      ) : null}


    </div>
  )
}

export default CheckoutScreen