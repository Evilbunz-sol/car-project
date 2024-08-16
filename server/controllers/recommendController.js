const matchCars = require("../utils/matchingAlgorithm");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getRecommendations = async (req, res) => {
  const supabase = req.app.locals.supabase;
  
  try {
    const userPreferences = req.body;
    
    const { data: allCars, error } = await supabase
      .from('cars')
      .select('*');

    if (error) throw new CustomError.BadRequestError('Error fetching cars');

    const recommendations = matchCars(userPreferences, allCars);
    res.status(StatusCodes.OK).json({ recommendations, count: recommendations.length });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

module.exports = { getRecommendations }