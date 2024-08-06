const Car = require("../models/Car");
const {StatusCodes} = require("http-status-codes")
const CustomError = require("../errors")

const getCarById = async (req, res) => {
  const {id:carId} = req.params
  
  const car = await Car.findOne({_id: carId})
  if (!car) {
    throw new CustomError.NotFoundError("No car found")
  }

  res.status(StatusCodes.OK).json({car})
}

const getOptions = async (req, res) => {
    const carSizes = await Car.distinct("carSize");
    const fuelTypes = await Car.distinct("fuelType");
    const makes = await Car.distinct("make");
    const models = await Car.distinct("model");
    
    res.status(StatusCodes.OK).json({ carSizes, fuelTypes, makes, models });
  };

module.exports = {getCarById, getOptions}







