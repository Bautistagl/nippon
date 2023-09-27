

const notificaciones = async (req,res) => {
    if (req.method === "POST") {
        console.log(req.body)
        res.status(200).send('OK')
    }
    else {
        res.status(400).json({ message: "Method not allowed" })
      }
}
export default notificaciones