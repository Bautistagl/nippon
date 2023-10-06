

export default async function handler(req, res) {
  const { method, body } = req;
  
  switch (method) {
    case "POST": {

      const data = body
      console.log(data)
      
      res.status(200).send('OK');
    }
    case "Get": {

      const data = body
      console.log(data)
      
      res.status(200).send('OK');
    }
   
    } }