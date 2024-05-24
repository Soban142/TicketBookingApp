import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  getHotelRooms,
  updatedHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../middlewares/verifyJWT.js";

const hotelRouter = express.Router();

//CREATE
hotelRouter.post("/", verifyAdmin, createHotel);

//UPDATE
hotelRouter.put("/find/:id", verifyAdmin, updatedHotel);

//DELETE
hotelRouter.delete("/find/:id", verifyAdmin, deleteHotel);

//GET
hotelRouter.get("/find/:id", getHotel);

//GET ALL
hotelRouter.get("/", getAllHotels);

//GET HOTEL BY TYPE
hotelRouter.get("/countByType", countByType);

//GET HOTEL BY CITY
hotelRouter.get("/countByCity", countByCity);

//GET ROOMS
hotelRouter.get("/room/:id", getHotelRooms);

export default hotelRouter;
