import express from 'express';
import { check } from 'express-validator';
import apicache from 'apicache';
import validarCampos from '../../middlewares/validarCampos.js';
import SalonesControlador from '../../controllers/salonesControlador.js';

const salonesControlador = new SalonesControlador();
// apicache
// apicache.options({ debug: true }); 

const router = express.Router();

router.get('/', apicache.middleware('5 minutes'), salonesControlador.buscarTodos);
router.get('/:salon_id', apicache.middleware('2 minutes'),salonesControlador.buscarPorID);
router.put('/:salon_id', salonesControlador.modificar);
router.post('/', 
    [
        check('titulo', 'El título es necesario.').notEmpty(),
        check('direccion', 'La dirección es necesaria.').notEmpty(),
        check('capacidad', 'La capacidad es necesaria.').notEmpty(), // ver cómo verificar que sea numérico
        check('importe', 'El importe es necesario.').notEmpty(),  // ver cómo verificar que sea numérico
        validarCampos    
    ],
    salonesControlador.crear);

export {router};