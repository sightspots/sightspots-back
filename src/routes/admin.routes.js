import express from "express";
import adminController from "../controllers/admin.controller";
import multer from '../middlewares/multer.middleware';
import cloudinary from '../middlewares/cloudinary.middleware';

const router = express.Router();

router.get('/create', adminController.createGet); // Renderiza el formulario para crear una location

router.post('/create', multer.multerUpload.array('pictures'), cloudinary.locationUpload, adminController.createPost); // Petición POST para insertar la nueva location

router.get('/edit/:id', adminController.editGet); // Renderiza el formulario para editar la location

router.put('/edit/:id', multer.multerUpload.array('pictures'), cloudinary.locationUpload, adminController.editPut); // Petición PUT para insertar la location editada

router.delete('/delete/:id', adminController.deletePost); // Petición DELETE para borrar la location


export default router; 