import back from "@/config2/axiosbautista";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Process the webhook data here
      const data = req.body;
      
     
      const handleMail = async () => {
        try {
         
          const response = await back.post('/nodemailerSend');
      
        } catch (error) {
          console.error(error);  // Maneja cualquier error que ocurra durante la solicitud
        }
      }
      handleMail()
      res.status(200).send('Webhook received successfully');
    } else {
      res.status(400).json({ message: 'Method not allowed' });
    }
}  