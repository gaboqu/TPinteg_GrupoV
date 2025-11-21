import express from 'express';
// import handlebars from 'handlebars';
// import nodemailer from 'nodemailer';
// import { fileURLToPath } from 'url';
// import { readFile } from 'fs/promises';
// import path from 'path';
// import { conexion } from './db/conexion.js';

//importo rutas
import { router as v1SalonesRutas } from './v1/routes/salonesRutas.js';
import { router as v1ReservasRutas } from './v1/routes/reservasRutas.js';



// Creo la app de express
const app = express();

// Middleware para parsear lo que reciba a JSON
app.use(express.json());

// Defino las rutas
app.use('/api/v1/salones', v1SalonesRutas);
app.use('/api/v1/reservas', v1ReservasRutas);


export default app;
