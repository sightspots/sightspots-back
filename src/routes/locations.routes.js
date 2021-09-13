import express from "express";
import locationsController from "../controllers/locations.controller";

const router = express.Router();

router.get('/', locationsController.indexGet); // EndPoint de locations con todas las locations

export default router;