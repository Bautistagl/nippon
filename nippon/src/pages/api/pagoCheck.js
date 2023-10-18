const nodemailer = require("nodemailer");

async function pagoCheck(req, res) {
  const { method, body } = req;

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
        to: `${body.email}`,
        subject: "Pedido recibido",
        template: `
        <html>
          <head>
            <title>Muchas gracias por su compra!</title>
          </head>
          <body>
            <h1>Ya recibimos su pago y estamos armando su pedido</h1>
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

export default pagoCheck;