import express from "express";
import userCtrl from "../controllers/user.controller";
import multer from '../middlewares/multer.middleware';
import cloudinary from '../middlewares/cloudinary.middleware';
import locationsController from "../controllers/locations.controller";

const router = express.Router();

// TODO Eliminar endpoint "/users" al terminar testeos
router.get("/users", userCtrl.getUsers);// * los usuarios
router.delete("/delete/:id", userCtrl.deleteUser);// borrar usuario
router.put("/edit/:id", multer.multerUpload.single('avatar'), cloudinary.avatarUpload, userCtrl.putUser);// editar usuario
router.post("/create-list", locationsController.locationListPost); //crear lista
router.get('/lists/', locationsController.locationListsGet); // EndPoint de la colección de listas creadas por el usuario
router.get('/lists/:id', locationsController.locationListGet); // EndPoint de una única lista creada por el usuario
router.put('/lists/:id', locationsController.locationListPut); // EndPoint para añadir una location a una lista

router.get("/:id", userCtrl.getUser); // 1 usuario

export default router;