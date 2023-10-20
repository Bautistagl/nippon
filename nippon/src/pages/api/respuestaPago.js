const nodemailer = require("nodemailer");


const path = require('path');
const getConfig = require('next/config');
const { serverRuntimeConfig } = getConfig();

async function respuestaPago(req, res) {
  const { method, body } = req;
  let mensajeHtml = `<html>
  <head>
    <title>Pago exitoso Nippon</title>
  </head>
  <body>
    <h2>Estimado ${body.nombre},</h2>
    <p>Le informamos que el pago ha sido procesado con exito, puede visualizar el estado de su pedido en 'Historial pedidos'.</p>
    <p>https://nippon-lemon.vercel.app/dashboard/pedidos</p>
    <p>Saludos Cordiales.</p>

    <p>Saludos Cordiales.</p>
    <p>https://nippon-lemon.vercel.app/</p>
    <p>nipponmacetas@gmail.com</p>
    <p>+54 9 11 4927-7864</p>
  </body>
</html>`
  switch (method) {
    case "POST": {
      
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nipponmacetas@gmail.com",
          pass: "efii hibd lhnl eafs",
        },
      });

      const mailOptions = {
        from: "Nippon",
        to: `${body.mail}`,
        subject: "Formulario distribuidor",
        text:`Estimado ${body.nombre},
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
          html:mensajeHtml,
          // attachments: [
          //   {
          //     filename:'pdfPrueba.pdf',
          //     path:'/pdfPrueba.pdf',
          //     contentType: 'application/pdf'
          //   }
          // ]
       
      };

      try {
        await transporter.sendMail(mailOptions);
      
        res.status(200).send({
          email: null,
          nick_name: null,
          id: "1",
          message: "Correo enviado exitosamente",
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send(error);
      }
    }
    
  }
}

export default respuestaPago;