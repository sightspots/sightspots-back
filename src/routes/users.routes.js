import express from "express";
import userCrtl from "../controllers/user.controller";
import multer from '../middlewares/multer.middleware';
import cloudinary from '../middlewares/cloudinary.middleware';

const router = express.Router();

// TODO Eliminar endpoint "/users" al terminar testeos
router.get("/users", userCrtl.getUsers);// * los usuarios
router.delete("/delete/:id", userCrtl.deleteUser);// borrar usuario
router.put("/edit/:id", multer.multerUpload.single('avatar'), cloudinary.cloudinaryAvatarUpload, userCrtl.putUser);// editar usuario
// TODO terminar controlador crear lista
// router.post("/create-list", userCrtl.postList);//crear lista
router.get("/:id", userCrtl.getUser);// 1 usuario



export default router;