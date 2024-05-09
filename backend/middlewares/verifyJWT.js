import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return next(
      createError(401, "Token is unavailable, you are not authenticated!")
    );

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedUser) => {
    if (err) return next(createError(403, "Token is invalid!"));
    req.user = decodedUser;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next();
    } else {
      return next(createError(403, "You are not authenticated"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    } else {
      return next(createError(403, "You are not authenticated!"));
    }
  });
};
