const nodemailer = require("nodemailer");

async function nodemailerSend(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST": {
      const jsonObject = JSON.stringify(body);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nipponmacetas@gmail.com",
          pass: "efii hibd lhnl eafs",
        },
      });

      const mailOptions = {
        from: "Nippon",
        to: `bautistagonzalezlazo@gmail.com`,
        subject: "Pedido recibido",
        text: jsonObject,
        template: `
        <html>
          <head>
            <title>Nuevo pedido!</title>
          </head>
          <body>
            <h1>Llego un nuevo pedido de pirulo</h1>
            <p>importe total $100000</p>
          </body>
        </html>
      `,
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

export default nodemailerSend;