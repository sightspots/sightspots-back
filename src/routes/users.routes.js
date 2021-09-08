import express from "express";
import userCrtl from "../controllers/user.controller";

const router = express.Router();

router.get("/users", userCrtl.getUsers);// * los usuarios
router.get("/user/:id", userCrtl.getUser);// 1 usuario
router.delete("/delete/:id", userCrtl.deleteUser);// borrar usuario
router.put("/edit/:id", userCrtl.putUser);// editar usuario

// endpoints para añadir locarions?
router.put("/put-fav/:id", userCrtl.putFav);//

export default router;