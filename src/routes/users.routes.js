import express from "express";
import userCrtl from "../controllers/user.controller";
import multer from '../middlewares/multer.middleware';
import cloudinary from '../middlewares/cloudinary.middleware';

const router = express.Router();

router.get("/users", userCrtl.getUsers);
router.get("/user/:id", userCrtl.getUser);
router.delete("/delete/:id", userCrtl.deleteUser);
router.put("/edit/:id", multer.multerUpload.single('avatar'), cloudinary.cloudinaryAvatarUpload, userCrtl.putUser);

export default router;