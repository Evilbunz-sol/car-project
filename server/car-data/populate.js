require('dotenv').config()

const connectDB = require("../db/connect")
const Car = require("../models/Car")

const jsonCar = require('../cars.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Car.deleteMany()
        await Car.create(jsonCar)
        console.log("Success")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
