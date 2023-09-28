
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Process the webhook data here
      const data = req.body;
      
      // Handle the notification data, update your database, and perform any necessary actions.
      
      res.status(200).send('Webhook received successfully');
    } else {
      res.status(400).json({ message: 'Method not allowed' });
    }
}  