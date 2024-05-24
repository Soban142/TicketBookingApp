import express from "express";
import { verifyAdmin } from "../middlewares/verifyJWT.js";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updatedRoom,
  updatedRoomAvailability,
} from "../controllers/roomController.js";

const roomRouter = express.Router();

//CREATE
roomRouter.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE
roomRouter.put("/:id", verifyAdmin, updatedRoom);
roomRouter.put("/availability/:id", updatedRoomAvailability);

//DELETE
roomRouter.delete("/:hotelId/:roomId", verifyAdmin, deleteRoom);

//GET
roomRouter.get("/:id", getRoom);

//GET ALL
roomRouter.get("/", getAllRooms);

export default roomRouter;
