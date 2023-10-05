import back from "@/config2/axiosbautista";

export default async function handler(req, res) {
  const { method, body } = req;
  
  switch (method) {
    case "POST": {

      const data = req.body
      const handleMail = async () => {
        try {
          
          // const email = paymentData.payer.email;
          const mailUsuario= {
            // Aquí puedes definir los datos que deseas enviar al backend
            mail: 'bautistagonzalezlazo@gmail.com',
            
           
            // ...
          };
          const response2 = await back.post('/nodemailerSend',mailUsuario);
          // const response = await back.post('/avisoPedido',mailUsuario);
      
        } catch (error) {
          console.error(error);  // Maneja cualquier error que ocurra durante la solicitud
        }
      }
      await handleMail();
      res.status(200).send('OK');
    }
    } }