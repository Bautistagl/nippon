
import axios from "axios"
import { useEffect } from "react"



export default function probando  ()  {
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


    return(
        <>
        hola
        </>
    )
}