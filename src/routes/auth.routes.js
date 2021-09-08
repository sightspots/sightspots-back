import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.get("/register", authController.registerGet);
router.post("/register", authController.registerPost);

router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);

router.post("/logout", authController.logoutPost);

export default router; 