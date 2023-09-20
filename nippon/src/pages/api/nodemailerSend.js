

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

      fs.readFile(process.cwd() + "/src/config/views/mail.html", "utf-8", function (
        err,
        html
      ) {
        if (err) {
          console.log(err);
          return;
        }
        let template = handlebars.compile(html);
        let replacements = {
          probando:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        };
      
        let htmlToSend = template(replacements);
        let mailOptions = {
          from: "Nippon",
          to:"bautistagonzalezlazo@gmail.com" ,
          subject: "Pedido recibido",
          html: htmlToSend,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error de mail");
            console.log(error.message);
            res.status(404).send();
            //.send(error.message);
          } else {
            res.status(200).send({
              email: null,
              nick_name: null,
              id: usuario.dataValues.id,
            });
          }
        });
        res.status(202).send();
      });
    }
  }
}

export default nodemailerSend