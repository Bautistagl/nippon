import mercadopago from "mercadopago"

mercadopago.configure({
  access_token: 'APP_USR-7421639621568939-100512-467d3652b2b12eaf7ff4434c563b1177-737047721'
})


const handler = async (req, res) => {
  if (req.method === "POST") {
    const product = req.body.product
    

    
    try {
      const preference = {
        items: [
          {
            title:product.title,
            unit_price: product.unit_price,
            quantity: product.quantity
          }
        ],
        auto_return: "approved",
        back_urls: {
          success: 'https://nippon-lemon.vercel.app/',
          failure: 'https://nippon-lemon.vercel.app/'
        },
       
      }
      
      const response = await mercadopago.preferences.create(preference)

      res.status(200).send({ url: response.body.init_point, id: response.body.id })
    } catch (error) {}
  } else {
    res.status(400).json({ message: "Method not allowed" })
  }
}

export default handler
