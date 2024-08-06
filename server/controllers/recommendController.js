const Car = require("../models/Car");
const matchCars = require("../utils/matchingAlgorithm");
const {StatusCodes} = require("http-status-codes")
const CustomError = require("../errors")

const getRecommendations = async (req, res) => {
    const userPreferences = req.body;

    const allCars = await Car.find({});
    const recommendations = matchCars(userPreferences, allCars)

    res.status(StatusCodes.OK).json({recommendations, count: recommendations.length});
  };

module.exports = { getRecommendations };






