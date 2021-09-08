import express from "express";
import locationsController from "../controllers/locations.controller";

const router = express.Router();

router.get('/', locationsController.indexGet); // EndPoint de locationsList = Array con todas las locations
router.get('/user/:id', locationsController.indexGetUser); // EndPoint del Array de locations del usuario
router.get('/location/:id', locationsController.OneGet); // EndPoint de una única location a traves de su ID propio


export default router;