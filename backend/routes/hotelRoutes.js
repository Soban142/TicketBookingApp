import express from "express";
import {
  countByCity,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updatedHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../middlewares/verifyJWT.js";

const hotelRouter = express.Router();

//CREATE
hotelRouter.post("/", verifyAdmin, createHotel);

//UPDATE
hotelRouter.put("find/:id", verifyAdmin, updatedHotel);

//DELETE
hotelRouter.delete("find/:id", verifyAdmin, deleteHotel);

//GET
hotelRouter.get("find/:id", getHotel);

//GET ALL
hotelRouter.get("/", getAllHotels);

// hotelRouter.get('/countByType', getHotels)
hotelRouter.get("/countByCity", countByCity);

export default hotelRouter;
