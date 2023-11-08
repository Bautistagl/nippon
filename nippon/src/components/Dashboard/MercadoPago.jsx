import { useEffect, useState } from "react"

import axios from "axios"
import Link from "next/link"



 const BotonPrueba = ({precio,finalizarCompra}) => {
  const [preferencId, setPreferenceId] = useState(null)
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  

  const handleMail = async () => {
    try {
      const mailUsuario = {
        mail:usuario2
      };
      const response = await back.post('/webhook');
      console.log(response,'AAAAAAA')
    } catch (error) {
      
      console.error(error); 
     
    }
  };
  const handleSubmit = async () => {
    
    window.location.href = url;
  };
  useEffect(() => {
    const generateLink = async () => {
     
    
      try {
        const { data: preference } = await axios.post("/checkout", {
            product: {
                title: "Pedido nippon",
                quantity: 1,
                unit_price: precio
              },
             
        })

        setUrl(preference.url)
        
      } catch (error) {
        console.error(error)
      }

      setLoading(false)
    }

    generateLink()
  }, [])

  return (
    <div> 
      { url !== null ?
      <Link href={`${url}`}>
            <button targer='_blank' className="button-popup2" onClick={handleSubmit} >

                Pagar con mercado pago
            </button>
        </Link> 
        : ''

      }
   
        
        
   
    </div>
  )
}
export default BotonPrueba
