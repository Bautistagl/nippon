import React, { useEffect, useState } from 'react'
import PopUp from './PopUp'
import BotonPrueba from './MercadoPago'
import Swal from 'sweetalert2'

const CheckoutScreen = () => {
    const [nombreapellido, setNombreapellido] = useState('')
    const [email, setEmail] =useState('')
    const [cuit, setCuit] =useState('')
    const [telefono, setTelefono] =useState('')
    const [metodo,setMetodo] = useState('Correo Argentino GBA')
    const [direccion, setDireccion] = useState('')
    const [condicion, setCondicion] = useState('')
    const [persona, setPersona] = useState('')
    const [entidad, setEntidad] = useState('')
    const [pago,setPago] =useState(false)
    const [usuario,setUsuario] = useState('')

    const handlePago = ()  => {
      if(email !== '' && telefono !== '' && nombreapellido !== '' && direccion !== ''){
        setPago(true)
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Complete todos los campos',
        })
      }
    }
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
        <label> Condición tributaria</label>
        <select
        value={condicion}
        onChange={(e) => setCondicion(e.target.value)}
        >
            <option value='Consumidor Final'> Consumidor Final</option>
            <option value='Monotributista'> Monotributista</option>
            <option value='Responsable inscripto'> Responsable inscripto</option>
        </select>
        {condicion === 'Monotributista' ?
         <>
           <label> CUIT/CUIL </label>
           <input onChange={(e)=> setCuit(e.target.value)}/>
         </> : ''}
         {condicion === 'Responsable inscripto' ?
         <>
           <label> CUIT/CUIL </label>
           <input onChange={(e)=> setCuit(e.target.value)}/>
           <label> Nombre de entidad: </label>
           <input onChange={(e)=> setEntidad(e.target.value)}/>
           <label> Tipo de persona </label>
           <input onChange={(e)=> setPersona(e.target.value)}/>
         </> : ''}
        
        <label> Direccion de envio </label>
        {metodo === 'Retiro por local' ? <input disabled value=''/> : <input  onChange={(e)=> setDireccion(e.target.value)}/>}
  
        <label> Comentarios extras  </label>
        <input/>
        <button className='button-checkout' onClick={()=>handlePago(true)}> Ir al pago </button>
      </div>
        {pago ? (
        <PopUp usuario={usuario} nombre={nombreapellido} email={email} telefono={telefono}
        envio={metodo} direccion={direccion}  setPago={setPago} pago={pago} />
      ) : null}
   


    </div>
  )
}

export default CheckoutScreen