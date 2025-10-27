
import express from "express";
import { getUserData } from "../controllers/fetchUserController.js";

const router = express.Router();


router.get("/get-user", getUserData);

export default router;
