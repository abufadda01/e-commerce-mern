import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
            .then(() => console.log(`PROSHOP DATABASE CONNECTED SUCCESSFULLY`))
            .catch((err) => console.log(`FAILED TO CONNECT TO THE DATABASE : ${err}`))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB