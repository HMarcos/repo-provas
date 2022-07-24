import dotenv from "dotenv";

dotenv.config();
const env = process.env;

export const BCRYPT_SECRET_KEY = +env.BCRYPT_SECRET_KEY || 10;
export const JWT_SECRET_KEY = env.JWT_SECRET_KEY || "eyJhbGciOiJIUzI1";