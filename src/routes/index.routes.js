
import express from "express";

const router = express.Router();

router.get('/', (req, res)=>{

    const message = 'Probando la ruta única';
     return res.status(200).json(message);

});

export default router; 
