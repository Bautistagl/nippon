

const notificaciones = async (req,res) => {
    if (req.method === "POST") {
        console.log(req.body)
        res.status(200).sned('OK')
    }
}