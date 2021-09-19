import express from "express";
import locationsController from "../controllers/locations.controller";

const router = express.Router();

router.get('/', locationsController.indexGet); // EndPoint de locations con todas las locations
router.put('/:id/rating/:action', locationsController.locationRatingPut); // Endpoint para añadir o resta +1 al rating
router.get('/:id', locationsController.oneGet); // Renderiza una única location (por eso el id de la location en la ruta)

export default router;