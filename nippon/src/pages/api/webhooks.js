import express from "express";
import bodyParser from "body-parser";

// Configura las URLs de los webhooks
const webhooks = {
  production: "https://nippon-lemon.vercel.app/webhooks",
  sandbox: "https://nippon-lemon.vercel.app/webhooks/sandbox",
};

// Crea una función que maneje los eventos de Mercado Pago
const handleWebhook = async (event) => {
  // Procesa los datos de la notificación
  // ...
};

// Registra la función de manejo de webhooks
const app = express();
app.use(bodyParser.json());
app.post(webhooks.production, handleWebhook);
app.post(webhooks.sandbox, handleWebhook);

// Escucha las solicitudes HTTP
app.listen(3000, () => {
  console.log("El servidor está escuchando en el puerto 3000");
});