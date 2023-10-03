
const nodemailer = require("nodemailer");

async function avisoPedido(req, res) {
  const { method, body } = req;
  
  switch (method) {
    case "POST": {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bautistagonzalezlazo@gmail.com",
          pass: "jkxg gzcs tthg llsr",
        },
      });

      const mailOptions = {
        from: "Nippon",
        to:'bautistagonzalezlazo@gmail.com',
        subject: "Nuevo Pedido",
        text: `Este es el cuerpo del correo electrónico avisando un ${body.data.payer},${body.data.mail}.`,
      };
   
      try {
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado");
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

export default avisoPedido;