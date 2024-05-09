import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

const createRoom = async (req, res, next) => {
  const newRoom = await Room.create({
    ...req.body,
  });
  try {
    await Hotel.findByIdAndUpdate(req.params.hotelId, {
      $push: { rooms: newRoom._id },
    });
    res.status(200).json(newRoom);
  } catch (error) {
    next(error);
  }
};

const updatedRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.roomId);
    try {
      await Hotel.findByIdAndUpdate(req.params.hotelId, {
        $pull: { rooms: req.params.roomId },
      });
    } catch (error) {}
    res.status(200).json("Room removed!");
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

export { createRoom, updatedRoom, deleteRoom, getRoom, getAllRooms };
