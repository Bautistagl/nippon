const express = require('express');
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors({
	origin: ['https://nippon-lemon.vercel.app'],
  }));

mercadopago.configure({
	access_token:'APP_USR-7421639621568939-100512-467d3652b2b12eaf7ff4434c563b1177-737047721'

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