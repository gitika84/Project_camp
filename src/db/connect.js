import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config({
    path : './.env'
})

const ConnectDB = async () => {

    return new Promise(async (resolve, reject) => {

        try {

            await mongoose.connect(process.env.MONGO_URL)

            resolve("Database Connected !!!")

        } catch (error) {

            reject(`Database Connection Failed: ${error.message}`)

        }

    })

}


export default ConnectDB