import { useEffect, useState } from "react"

import axios from "axios"
import Link from "next/link"



 const BotonPrueba = ({precio,finalizarCompra}) => {
  const [preferencId, setPreferenceId] = useState(null)
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  

  const handleSubmit = async () => {
    await finalizarCompra();
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
   {/* <Link href={`${url}`}>
        </Link>  */}
            <button onClick={handleSubmit} >

                Pagar con mercado pago
            </button>
        
        
   
    </div>
  )
}
export default BotonPrueba
