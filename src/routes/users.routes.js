import express from "express";
import userCrtl from "../controllers/user.controller";
import multer from '../middlewares/multer.middleware';
import cloudinary from '../middlewares/cloudinary.middleware';

const router = express.Router();

// TODO Eliminar endpoint "/users" al terminar testeos
router.get("/users", userCrtl.getUsers);// * los usuarios
router.delete("/delete/:id", userCrtl.deleteUser);// borrar usuario
router.put("/edit/:id", multer.multerUpload.single('avatar'), cloudinary.cloudinaryAvatarUpload, userCrtl.putUser);// editar usuario
router.get("/lists", userCrtl.getLists);//ver todas las listas
router.post("/list/create", userCrtl.postList);//crear lista
router.put("/list/add-location/:id", userCrtl.addLocationToList);//añadir location a una lista
router.get("/:id", userCrtl.getUser);// 1 usuario

export default router;