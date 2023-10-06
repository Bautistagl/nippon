import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const WebhookPage = () => {
  const [webhookData, setWebhookData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Escucha las solicitudes HTTP POST en la ruta /webhook
    const handleWebhook = async (req, res) => {
      // Procesa el webhook
      setWebhookData(req.body);

      // Responde con un código de estado 201 (Creado)
      res.status(201).send('OK');
    };

    router.events.on('fetch', handleWebhook);

    return () => {
      // Elimina el manejador de eventos
      router.events.off('fetch', handleWebhook);
    };
  }, []);

  if (!webhookData) {
    return <div>Esperando webhook...</div>;
  }

  // Procesa el webhook

  // ...

  return <div>
    <h1>Webhook recibido</h1>
    <p>
      El estado del pago es: {webhookData.estado}
    </p>
    <p>
      El monto del pago es: {webhookData.monto}
    </p>
  </div>;
};

export default WebhookPage;