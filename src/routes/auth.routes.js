import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.get("/register", authController.registerGet);
router.post("/register", authController.registerPost);

export default router;