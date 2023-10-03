const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs").promises;


async function nodemailerSend(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST": {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bautistagonzalezlazo@gmail.com",
          pass: "ybnc fgfs pcqi rxra",
        },
      });

      try {
        const html = await fs.readFile(
          process.cwd() + "/src/config/views/mail.html",
          "utf-8"
        );
  

        const template = handlebars.compile(html);
        // const replacements = {
        //   probando: "bautista",
        // };

        const htmlToSend = template();
        const mailOptions = {
          from: "Nippon",
          to: "bautistagonzalezlazo@gmail.com",
          subject: "Pedido recibido",
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
        console.log(`Current directory: ${cwd()}`)
        console.error("Error al enviar el correo:", error.message);
        res.status(500).send(error);
      }
      break;
    }
    default: {
      res.status(405).end(); // Método no permitido
    }
  }
}

export default nodemailerSend;






