import back from "@/config2/axiosbautista";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const paymentData = req.body;
      const data = {
        id: paymentData.id,
        amount: paymentData.amount,
        currency: paymentData.currency,
        // ...
      };
      // const handleMail = async () => {
      //   try {
      //     const paymentData = req.body;
      //     // const email = paymentData.payer.email;
      //     const mailUsuario= {
      //       // Aquí puedes definir los datos que deseas enviar al backend
      //       mail: paymentData,
            
           
      //       // ...
      //     };
      //     const response = await back.post('/avisoPedido',paymentData);
      //     const response2 = await back.post('/nodemailerSend',mailUsuario);
      
      //   } catch (error) {
      //     console.error(error);  // Maneja cualquier error que ocurra durante la solicitud
      //   }
      // }
      // await handleMail();
      res.status(200).send('OK');
    } else {
      res.status(400).json({ message: 'Method not allowed' });
    }
}  