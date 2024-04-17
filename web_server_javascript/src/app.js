import dotenv from "dotenv";
dotenv.config({ path: "./src/config/config.env" });
import express from "express";
import responseRoutes from "./api/v1/routes/responseRoutes.js";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
/**
 *
 */
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
/**
 *
 */
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Change this to a secret key
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000, //15min
    },
  })
);
/**
 *
 */
app.use("/api/v1/", responseRoutes);
/**
 *
 */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Databaase Connected successfully");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on ", PORT);
    });
  })
  .catch((error) => {
    console.log(
      "Something went wrong while connecting to Database + Server",
      error.message
    );
  });
