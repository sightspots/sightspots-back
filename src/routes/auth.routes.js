import express from "express";
import authController from "../controllers/auth.controller";
import multer from '../middlewares/multer.middleware';
import cloudinary from '../middlewares/cloudinary.middleware';

const router = express.Router();

router.get("/login", authController.registerGet);
router.post("/register", multer.multerUpload.single('avatar'), cloudinary.avatarUpload, authController.registerPost);

router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);

router.post("/logout", authController.logoutPost);

export default router; 