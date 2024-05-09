import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updatedUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../middlewares/verifyJWT.js";

const userRouter = express.Router();

//UPDATE
userRouter.put("/:id", verifyUser, updatedUser);

//DELETE
userRouter.delete("/:id", verifyUser, deleteUser);

//GET
userRouter.get("/:id", verifyUser, getUser);

//GET ALL
userRouter.get("/", verifyAdmin, getAllUsers);

export default userRouter;
