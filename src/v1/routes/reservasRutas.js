import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import ReservasController from '../../controllers/reservasController.js';


const reservasController = new ReservasController();
const router = express.Router();

router.get('/', reservasController.buscarTodos);
router.get('/:reserva_id', reservasController.buscarPorId);
router.post('/',
    [
        check('fecha_reserva', 'La fecha_reserva es obligatoria').notEmpty(),
        check('salon_id', 'El salon es obligatorio').notEmpty(),
        check('usuario_id', 'El usuario es obligatorio').notEmpty(),
        check('turno_id', 'El turno es obligatorio').notEmpty(),
        check('servicios', 'Faltan los servicios de la a contratar').notEmpty()
        .isArray(),
        check('servicios.*.importe').isFloat()
        .withMessage('El importe debe ser un número'),
        validarCampos
    ],
    reservasController.crear);

    export { router };
