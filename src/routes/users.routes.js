import express from "express";
import userCrtl from "../controllers/user.controller";
import multer from '../middlewares/multer.middleware';
import cloudinary from '../middlewares/cloudinary.middleware';

const router = express.Router();

// TODO Eliminar endpoint "/users" al terminar testeos
router.get("/users", userCrtl.getUsers);// * los usuarios
router.delete("/delete/:id", userCrtl.deleteUser);// borrar usuario
router.put("/edit/:id", multer.multerUpload.single('avatar'), cloudinary.avatarUpload, userCrtl.putUser);// editar usuario
router.put("/put-fav/:id", userCrtl.putFav);//añadir a favoritos
// TODO terminar controlador de eliminar favorito y crear lista
// router.put("/delete-fav/:id");//eliminar de favoritos
// router.post("/create-list", userCrtl.postList);//crear lista
router.get("/:id", userCrtl.getUser);// 1 usuario

export default router;