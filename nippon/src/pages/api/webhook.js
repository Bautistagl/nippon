

export default async function handler(req, res) {
  const { method, body } = req;
  
  switch (method) {
    case "POST": {

      const data = body
      
      res.status(201).send('OK');
    }
   
    } }