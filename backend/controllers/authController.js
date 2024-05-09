import User from "../models/User.js";
import { createError } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  console.log(req.body);
  if (!req.body.username && !req.body.email && !req.body.password) {
    return createError(204, "Content unavailable");
  }

  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    +process.env.SALTROUNDS
  );
  req.body.password = hashedPassword;
  try {
    const newUser = await User.create({
      ...req.body,
    });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  if ((!req.body.username || !req.body.email) && !req.body.password) {
    return createError(204, "Content unavailable");
  }

  console.log(req.body);
  try {
    const emailOrUsername = req.body?.username || req.body?.email;
    const foundUser = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    }).exec();
    console.log(foundUser);
    if (!foundUser) {
      return next(createError(404, "User not found!"));
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      foundUser.password
    );
    console.log(validPassword);

    if (!validPassword) {
      return next(createError(400, "Incorrect password!"));
    }

    const token = jwt.sign(
      { id: foundUser._id, isAdmin: foundUser.isAdmin },
      process.env.SECRET_KEY
    );

    console.log(token);

    const { password, isAdmin, ...others } = foundUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};
