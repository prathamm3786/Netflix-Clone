import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 5000,
  SECRET_KEY: process.env.SECRET_KEY,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
