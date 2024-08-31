import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyGuestJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

      
    if (!token) {
      throw new ApiError(401, "ERROR :: You have not attending any quiz !!");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.TEMP_USER_ACCESS_TOKEN_SECRET
    );

    req.id = decodedToken.id;
    req.quizType = decodedToken.quizType;
  
    next();
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "ERROR :: Invalid access token !!"
    );
  }
});
