import express from 'express';
import SalonesControlador from '../../controllers/salonesControlador.js';

const salonesControlador = new SalonesControlador();

const router = express.Router();

router.get('/', salonesControlador.buscarTodos);

export {router};