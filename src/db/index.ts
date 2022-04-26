import mongoose from "mongoose"

const dbUrl = process.env.DATABASE_PATH as string

const coonectDB = async () => {
    try {
        await mongoose.connect(dbUrl)
        console.log('mongodb is live....')
    } catch (err) {
        console.log(`could not connect to mongodb ---- ${err}`)
    }
}

export default coonectDB