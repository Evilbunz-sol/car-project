const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const matchCars = require("../utils/matchingAlgorithm");
const { extractPreferences } = require("../utils/llmService");

const getRecommendations = async (req, res) => {
  const supabase = req.app.locals.supabase;
  
  try {
    const userInput = req.body.userInput;
    if (!userInput) {
      throw new CustomError.BadRequestError('User input is required');
    }

    const preferences = await extractPreferences(userInput);

    const { data: cars, error } = await supabase
      .from('cars')
      .select('*');
    if (error) {
      console.error('Supabase error:', error);
      throw new CustomError.BadRequestError('Error fetching cars');
    }

    const recommendations = matchCars(preferences, cars);

    res.status(StatusCodes.OK).json({ 
      recommendations, 
      count: recommendations.length,
      preferences
    });
  } catch (error) {
    console.error('Error in getChatRecommendations:', error);
    if (error instanceof CustomError.BadRequestError) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        msg: 'Error processing chat recommendations',
        error: error.message
      });
    }
  }
};

module.exports = { getRecommendations };