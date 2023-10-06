const nodemailer = require("nodemailer");
import fs from 'fs';
import path from 'path';

async function respuestaFormulario(req, res) {
  const { method, body } = req;
  let mensajeHtml = `<html>
  <head>
    <title>Estimado ${body.nombre}</title>
  </head>
  <body>
    <h1>Estimado ${body.nombre}</h1>
    <p>Your paragraph</p>
  </body>
</html>`
  switch (method) {
    case "POST": {
      
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bautistagonzalezlazo@gmail.com",
          pass: "ybnc fgfs pcqi rxra",
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
          attachments: [
            {
              filename:'pdfPrueba.pdf',
              path: path.join(__dirname, '../../../../public/pdfPrueba.pdf'), // <= Here
              contentType: 'application/pdf'
            }
          ]
       
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(path.join(__dirname, '../public/pdfPrueba.pdf'));
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
    
  }
}

export default respuestaFormulario;