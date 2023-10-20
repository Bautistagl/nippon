import "../styles/index/Navbar.css"
import '../styles/globals.css'
import '../styles/index/PrimerSeccion.css'
import '../styles/index/Produccion.css'
import '../styles/index/Iconos.css'
import '../styles/index/CasiFooter.css'
import '../styles/index/Footer.css'
import '../styles/index/Catalogo.css'
import '../styles/index/Secciones.css'
import '../styles/index/Cards.css'
import '../styles/Dashboard/Index.css'
import '../styles/Dashboard/Pedidos.css'
import '../styles/Dashboard/CheckoutScreen.css'
import '../styles/admins/PedidosPendientes.css'
import '../styles/loginScreen.css'
import { useEffect } from 'react';
import {  onAuthStateChanged } from 'firebase/auth';
import { auth } from "@/firebasebautista"

export default function App({ Component, pageProps }) {
 
  
  // Use useEffect para ejecutar la suscripción a onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        // Guarda el ID del usuario en el LocalStorage
        
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('emailNippon', user.email);
      } else {
        // El usuario ha cerrado sesión, borra el ID del usuario del LocalStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('emailNippon');
      }


    });

    
    return () => unsubscribe();
  }, []); 


  return <Component {...pageProps} />
}
