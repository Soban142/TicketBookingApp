import Hotel from "../models/Hotel.js";

const createHotel = async (req, res, next) => {
  try {
    const newHotel = await Hotel.create({
      ...req.body,
    });
    res.status(200).json(newHotel);
  } catch (error) {
    next(error);
  }
};

const updatedHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel removed!");
  } catch (error) {
    next(error);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const documents = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.json(documents);
  } catch (error) {
    next(error);
  }
};

export {
  createHotel,
  updatedHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
};
