import express from 'express';
import { authenticate } from "../middleware/authMiddleware.js";
import { likeUser, dislikeUser } from "../controllers/userActionsController.js";

const router = express.Router();


router.post("/like-user", authenticate, likeUser);
router.post("/dislike-user", authenticate, dislikeUser);

export default router;