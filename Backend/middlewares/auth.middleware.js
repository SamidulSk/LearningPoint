import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import asyncHandler from "./asyncHandler.middleware.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  // extracting token from the cookies
  const token = req.cookies?.token;

  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  try {
    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request object
    req.user = decoded;

    next(); // Continue to next middleware
  } catch (error) {
    // Handle expired or invalid tokens
    return next(new AppError("Invalid or expired token. Please login again.", 401));
  }
});

// Middleware to check if user is admin or not
export const authorizeRoles = (...roles) =>
  asyncHandler(async (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  });

// Middleware to check if user has an active subscription or not
export const authorizeSubscribers = asyncHandler(async (req, _res, next) => {
  // If user is not admin or does not have an active subscription then error else pass
  if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
});