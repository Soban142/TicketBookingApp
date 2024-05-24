import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

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
  const { min, max, limit, ...others } = req.query;

  const queryObject = Object.entries(req.query);
  const selectedQueries = {};

  queryObject.forEach((query) => {
    const [key, val] = query;
    if (key == "featured") {
      selectedQueries[key] = true;
    } else if (key == "limit") {
      selectedQueries[key] = parseInt(val);
    } else {
      selectedQueries[key] = val;
    }
  });
  console.log({ ...others });

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// const getAllHotels = async (req, res, next) => {
//   const { min, max, ...others } = req.query;
//   console.log(req.query);
//   console.log(min, max, { ...others });
//   try {
//     const hotels = await Hotel.find({
//       ...others,
//       cheapestPrice: { $gt: min | 1, $lt: max || 999 },
//     }).limit(req.query.limit);
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };

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

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const rooms = await Promise.all(
      hotel.rooms.map((roomId) => {
        console.log(roomId);
        return Room.findById(roomId);
      })
    );

    res.status(200).json(rooms);
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
  countByType,
  getHotelRooms,
};
