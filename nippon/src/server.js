const express = require('express');
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors({
	origin: ['https://nippon-lemon.vercel.app'],
  }));

mercadopago.configure({
	access_token:'TEST-6052064161175970-100515-84875ac212ab24afa5fb0682d78ae91a-420293827'

})

app.get("/",function(req,res){
	res.send("el servidor funciona")
})

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "https://nippon-lemon.vercel.app/",
			"failure": "https://nippon-lemon.vercel.app/",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences
		.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.listen(3030, ()=>{
	console.log('el servidor corre 3030')
})