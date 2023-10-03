import back from "@/config2/axiosbautista";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Process the webhook data here
      const data = req.body;
      
      // Handle the notification data, update your database, and perform any necessary actions.
      const handleMail = async () => {
        try {
          const mailUsuario= {
            // Aquí puedes definir los datos que deseas enviar al backend
            mail: 'bautistagonzalezlazo@gmail.com',
           
            // ...
          };
          const response = await back.post('/avisoPedido',mailUsuario);
          console.log('Respuesta del servidor:', response.data);
        } catch (error) {
          console.error(error);  // Maneja cualquier error que ocurra durante la solicitud
        }
      }
      await handleMail();
      res.status(200).json({ message: 'Llego compra' });
    } else {
      res.status(400).json({ message: 'Method not allowed' });
    }
}  