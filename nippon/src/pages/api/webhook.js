import back from "@/config2/axiosbautista";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Verifica la presencia del campo data
      const data = req.body;
      if (!data) {
        res.status(400).json({ message: 'El campo data es obligatorio' });
        return;
      }

      // ...

      res.status(200).send('OK');
    } else {
      res.status(400).json({ message: 'Method not allowed' });
    }
}