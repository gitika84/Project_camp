import app from '../src/app.js'
import dotenv from "dotenv"
import ConnectDB from './db/connect.js'

dotenv.config({
    path : './.env'
})

const port = process.env.PORT

ConnectDB()
    .then((result) => {
        console.log(result)
        app.listen(port , () => {
            console.log(`Example App is Running on PORT ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
    