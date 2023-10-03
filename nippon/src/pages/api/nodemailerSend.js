

const nodemailer = require("nodemailer");
let handlebars = require("handlebars");
const fs = require("fs");

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

      fs.readFile(process.cwd() + "/src/config/views/mail.html", "utf-8", async (
        err,
        html
      ) => {
        if (err) {
          console.log(err);
          return;
        }
        let template = handlebars.compile(html);
        let replacements = {
          probando: `bautista`,
        };

        let htmlToSend = template(replacements);
        const mailOptions = {
          from: "Nippon",
          to: 'bautistagonzalezlazo@gmail.com',
          subject: "Pedido recibidso",
          html: htmlToSend,
        };

        // Aquí agregamos la palabra clave `await`
        await transporter.sendMail(mailOptions);

        console.log('se mando')
        res.status(200).send({
          email: null,
          nick_name: null,
          id: '1',
        });
      });
    }
  }
}