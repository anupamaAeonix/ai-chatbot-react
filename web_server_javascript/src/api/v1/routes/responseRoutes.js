import express from "express";
import { postResponse } from "../controller/responseController.js";
const router = express.Router();

router.route("/").post(postResponse);

export default router;
