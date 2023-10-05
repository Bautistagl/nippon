export default async function handler(req, res) {
  if (req.method === 'POST') {
    const payload = req.body; // El cuerpo del webhook de Mercado Pago
    
    // Realizar alguna acción con el payload (por ejemplo, validar la compra)
    
    // Registrar la información en la consola
    console.log('Webhook de Mercado Pago recibido:', payload);

    // Responder a Mercado Pago
    res.status(200).end();
  } else {
    res.status(405).end(); // Método no permitido
  }
}