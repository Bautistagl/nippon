import back from "@/config2/axiosbautista";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Process the webhook data here
      const data = req.body;
      const payerData = data.payer;
      const amountData = data.amount 
      const amount = amountData.total

      
      // Handle the notification data, update your database, and perform any necessary actions.
      const handleMail = async () => {
        try {
          const mailUsuario= {
            // Aquí puedes definir los datos que deseas enviar al backend
            mail: 'bautistagonzalezlazo@gmail.com',
           
            // ...
          };
          const response2 = await back.post('/nodemailerSend',amount );
          const response = await back.post('/avisoPedido',mailUsuario);
          
        } catch (error) {
          console.error(error);  // Maneja cualquier error que ocurra durante la solicitud
        }
      }
      await handleMail();
      res.status(200).send('OK');
    } else {
      res.status(400).json({ message: 'Method not allowed' });
    }
}  