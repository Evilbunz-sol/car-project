const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getCarDetails = async (req, res) => {
  const supabase = req.app.locals.supabase;

  try {
    const { data: car, error } = await supabase
      .from('cars')
      .select('*')
      .eq('id', req.params.id)
      .single();


    if (error) throw new CustomError.NotFoundError('Car not found');
    if (!car) {
      throw new CustomError.NotFoundError(`No car with id: ${req.params.id}`);
    }

    res.status(StatusCodes.OK).json({ car });
  } catch (error) {    
    if (error instanceof CustomError.NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error fetching car details' });
    }
  }
};


const getAllCars = async (req, res) => {
  const supabase = req.app.locals.supabase;

  try {
    const { data: cars, error } = await supabase
      .from('cars')
      .select('*');

    if (error) throw new CustomError.BadRequestError('Error fetching cars');

    res.status(StatusCodes.OK).json({ cars });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error fetching car details' });
  }
};


module.exports = { getCarDetails, getAllCars }