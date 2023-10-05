import back from "@/config2/axiosbautista";
const nodemailer = require("nodemailer");

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
    case "GET": {
      
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bautistagonzalezlazo@gmail.com",
          pass: "ybnc fgfs pcqi rxra",
        },
      });

      const mailOptions = {
        from: "Nippon",
        to: `bautistagonzalezlazo@gmail.com`,
        subject: "Formulario distribuidor",
        text:`Estimado get,
         Muchas gracias por su interés en nuestros productos.
         Nosotros tenemos 2 grandes líneas de productos: 
         -Sakura: son macetas desmoldables
         -Origami: son macetas desmoldables
         Te voy a pedir que me pases los siguientes datos:
         -Estructura
         -Que línea de macetas les interesa.
         -Hace cuánto están en el rubro?
         -¿Cuentan con página Web?
         -¿Son responsables insscriptos?
          Te solicito la razón social
          Saludos cordsales,
          Nippon`,
          
       
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Coraaaareo enviado");
        res.status(200).send({
          email: null,
          nick_name: null,
          id: "1",
          message: "Correo enviado exitosamente",
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error al enviar el correo");
      }
    }
    } }