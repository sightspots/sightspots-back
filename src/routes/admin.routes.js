import express from "express";
import adminController from "../controllers/admin.controller";
import { isAdmin } from "../middlewares/admin.middlewares"

//TODO Implementar [isAdmin] a la espera de pruebas 

const router = express.Router();

router.get('locations', adminController.indexGet); // Renderiza todas las locations

router.get('locations/:id', adminController.oneGet); // Renderiza una única location (por eso el id de la location en la ruta)

router.get('create', adminController.createGet); // Renderiza el formulario para crear una location

router.post('create', adminController.createPost); // Petición POST para insertar la nueva location

router.get('edit', adminController.editGet); // Renderiza el formulario para editar la location

router.put('edit/', adminController.editPost); // Petición PUT para insertar la location editada

router.delete('delete/:id', adminController.deletePost); // Petición DELETE para borrar la location


export default router; 