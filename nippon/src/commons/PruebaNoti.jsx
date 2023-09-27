import { useEffect, useState } from "react"

import axios from "axios"
import Link from "next/link"



 const PruebaNoti = ({precio}) => {
  const [preferencId, setPreferenceId] = useState(null)
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  

  
  useEffect(() => {
    const generateLink = async () => {
     
    
      try {
        const pinchila = await axios.post("/api/notificaciones", {
           
        })

       
        
      } catch (error) {
        console.error(error)
      }

     
    }

    generateLink()
  }, [])

  return (
    <div>
  
            <button>

                Pagar con mercado pago
            </button>
     
        
        
   
    </div>
  )
}
export default PruebaNoti
