const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs").promises;

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

      try {
        const html = await fs.readFile(
          process.cwd() + "/src/config/views/mail.html",
          "utf-8"
        );

        const template = handlebars.compile(html);
        const replacements = {
          probando: "Nuevo pedido",
        };

        const htmlToSend = template(replacements);
        const mailOptions = {
          from: "Nippon",
          to: "bautistagonzalezlazo@gmail.com",
          subject: "Nuevo Pedido",
          html: htmlToSend,
        };

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