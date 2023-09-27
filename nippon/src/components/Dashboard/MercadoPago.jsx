import { useEffect, useState } from "react"

import axios from "axios"
import Link from "next/link"



 const BotonPrueba = ({precio}) => {
  const [preferencId, setPreferenceId] = useState(null)
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  

  
  useEffect(() => {
    const generateLink = async () => {
     
    
      try {
        const { data: preference } = await axios.post("/checkout", {
            product: {
                title: "Pedido nippon",
                quantity: 1,
                unit_price: precio
              }
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
   <Link href={`${url}`}>
            <button>

                Pagar con mercado pago
            </button>
        </Link> 
        
        
   
    </div>
  )
}
export default BotonPrueba
