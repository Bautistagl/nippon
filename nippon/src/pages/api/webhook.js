

export default async function handler(req, res) {
  const { method, body } = req;
  
  switch (method) {
    case "POST": {

      const data = body
      console.log(data)
      const handleMail = async () => {
          try {
            const paymentData = req.body;
            // const email = paymentData.payer.email;
            const mailUsuario= {
              // Aquí puedes definir los datos que deseas enviar al backend
              mail: paymentData,
              
             
              // ...
            };
            const response = await back.post('/avisoPedido',paymentData);
            c
        
          } catch (error) {
            console.error(error);  // Maneja cualquier error que ocurra durante la solicitud
          }
        }
        
        await handleMail();
        res.status(200).send('OK');
      }
      case "GET": {
  
        const data = body
        console.log(data)
        
        res.status(200).send('OK');
      }
    }
   
    } 