import express from "express";
import userCrtl from "../controllers/user.controller";
import multer from '../middlewares/multer.middleware';
import cloudinary from '../middlewares/cloudinary.middleware';

const router = express.Router();

// TODO Eliminar endpoint "/users" al terminar testeos
router.get("/users", userCrtl.getUsers);// * los usuarios
router.get("/user/:id", userCrtl.getUser);// 1 usuario
router.delete("/delete/:id", userCrtl.deleteUser);// borrar usuario
router.put("/edit/:id", multer.multerUpload.single('avatar'), cloudinary.cloudinaryAvatarUpload, userCrtl.putUser);// editar usuario
// TODO terminar controlador de eliminar favorito y crear lista
router.post("/create-list", userCrtl.postList);//crear lista


export default router;