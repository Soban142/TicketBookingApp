import express from "express";
import {
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
hotelRouter.put("/:id", verifyAdmin, updatedHotel);

//DELETE
hotelRouter.delete("/:id", verifyAdmin, deleteHotel);

//GET
hotelRouter.get("/:id", getHotel);

//GET ALL
hotelRouter.get("/", getAllHotels);

export default hotelRouter;
