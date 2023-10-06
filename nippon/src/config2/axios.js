import axios from "axios"
axios.defaults.baseURL="https://nippon-lemon.vercel.app/api"

const back=axios.create({
    baseURL:"https://nippon-lemon.vercel.app/api"
})

export default back;