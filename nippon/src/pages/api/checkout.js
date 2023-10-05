import mercadopago from "mercadopago"

mercadopago.configure({
  access_token: 'TEST-6052064161175970-100515-84875ac212ab24afa5fb0682d78ae91a-420293827'
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
