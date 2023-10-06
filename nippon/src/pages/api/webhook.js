export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        // Verifica la autenticidad del webhook (opcional pero recomendado).
        // Puedes utilizar la firma del webhook para verificar su autenticidad.
        // Consulta la documentación de Mercado Pago para obtener detalles sobre cómo hacerlo.

        // Procesa el cuerpo del webhook.
        const data = JSON.parse(body);

        // Verifica que el webhook sea de Mercado Pago (opcional pero recomendado).
        // Puedes verificar el evento o cualquier otro atributo que indique que el webhook proviene de Mercado Pago.

        // Realiza el procesamiento necesario según el tipo de evento del webhook.
        switch (data.type) {
          case "payment":
            // Este es un ejemplo para manejar eventos de pago.
            // Aquí puedes procesar la información del pago acreditado.
            const paymentId = data.data.id;
            const paymentStatus = data.data.status;
            // Realiza las acciones necesarias en tu aplicación en función de la información recibida.

            break;

          // Agrega más casos según los tipos de eventos que desees manejar.

          default:
            // Manejar otros tipos de eventos si es necesario.
            break;
        }

        // Devuelve una respuesta exitosa al servidor de Mercado Pago.
        res.status(200).send('OK');
      } catch (error) {
        console.error("Error al procesar el webhook:", error);
        res.status(500).send('Error interno al procesar el webhook');
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}