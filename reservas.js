import express from 'express';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import path from 'path';
import { conexion } from './db/conexion.js';

// Creo la app de express
const app = express();

// Middleware para parsear lo que reciba a JSON
app.use(express.json());

app.get('/estado', (req, res) => {
    res.json({ 'ok': true });
});


//////// POST - Enviar notificación por email///////

app.post('/notificacion', async (req, res) => {

  console.log(req.body);

  // VALIDACIÓN (igual que el profe, pero con return)
  if (!req.body.fecha || !req.body.salon || !req.body.turno || !req.body.correoDestino) {
    return res.status(400).send({ estado: false, mensaje: 'Faltan datos requeridos!' });
  }

  try {
    // desestructuramos
    const { fecha, salon, turno, correoDestino } = req.body;

    // armamos ruta de la plantilla
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const plantilla = path.join(__dirname, 'utiles', 'handlebars', 'plantilla.hbs');

    console.log("acá");
    console.log(plantilla);

    // leemos y compilamos handlebars
    const datos = await readFile(plantilla, 'utf-8');
    const template = handlebars.compile(datos);
    const html = template({ fecha, salon, turno });

    // transporter IGUAL QUE EL PROFE, usando .env
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // opciones de envío
    const opciones = {
      to: correoDestino,
      subject: 'Notificación',
      html: html
    };

    // envío CON CALLBACK, como hace el profe
    transporter.sendMail(opciones, (error, info) => {
      if (error) {
        console.log('Error al enviar correo:', error);
        return res.json({ ok: false, mensaje: 'Error al enviar el correo.' });
      }

      console.log(info);
      return res.json({ ok: true, mensaje: 'Correo enviado.' });
    });

  } catch (error) {
    console.log('Error general en /notificacion:', error);
    return res.status(500).json({ ok: false, mensaje: 'Error interno del servidor.' });
  }
});


//////// GET - Obtener todos los salones ///////


app.get('/salones', async (req, res) => {

  try {

    const sql = 'SELECT * FROM salones WHERE activo = 1';
    const [results, fields] = await conexion.query(sql);

    // console.log(results); // Ver los resultados de la consulta
    // console.log(fields); // Ver los campos de la consulta

    res.json({ ok: true, 'salones': results });

  } catch (error) {
    console.log('Error en /salones:', error);
  }

  });


//////// GET - Obtener un salón por ID ///////



app.get('/salones/:salon_id', async (req, res) => {

  try {

    const salon_id = req.params.salon_id;
    const sql = `SELECT * FROM salones WHERE activo = 1 AND salon_id = ?`;
    const valores = [salon_id];

    const [results, fields] = await conexion.execute(sql, valores);

    if (results.length === 0) {
      return res.status(404).json({ 
        ok: false, 
        mensaje: 'Salón no encontrado.' });
    }


    res.json({  
              estado: true, 
              salon: results[0]
            });

  } catch (error) {
    console.log('Error en GET /salones/salon_id:', error);
    res.status(500).json({ 
      estado: false, 
      mensaje: 'Error del servidor.' });
  }

  });


  /////// POST - Crear un nuevo salón ///////



  app.post('/salones', async (req, res) => {
    try {

        if (!req.body.titulo || !req.body.direccion || !req.body.capacidad || !req.body.importe) {
        return res.status(400).json({ 
          estado: false, 
          mensaje: 'Faltan datos requeridos!' 
        });
      }
      const { titulo,direccion, capacidad, importe } = req.body; 
      const valores = [titulo, direccion, capacidad, importe]; 
      const sql = 'INSERT INTO salones (titulo, direccion, capacidad, importe) VALUES (?, ?, ?, ?)'; 

      const [result] = await conexion.execute(sql, valores);
      console.log(result);

      res.status(201).json({  
        estado: true,
        mensaje: `Salón creado con id ${result.insertId}.`,
        salon: {
          titulo, 
          direccion, 
          capacidad, 
          importe}
      });

    } catch (error) {
      console.log('Error en POST /salones:', error);
      res.status(500).json({ 
        ok: false,  
        mensaje: 'Error del servidor al crear salon.'
      });
    }
  });



///////  PUT - Actualizar un salón  ///////


app.put('/salones/:salon_id', async (req, res) => {

  try {

    const salon_id = req.params.salon_id;
    const sql = 'SELECT * FROM salones WHERE activo = 1 AND salon_id = ?';
    const [results] = await conexion.execute(sql, [salon_id]); 
    if (results.length === 0) {
      return res.status(404).json({
        estado: false,
        mensaje: 'Salón no encontrado.'
      });
    }

    if (!req.body.titulo || !req.body.direccion || !req.body.capacidad || !req.body.importe) {
      return res.status(400).json({
        estado: false,
        mensaje: 'Faltan datos requeridos!'
      });
    }
       
    const { titulo, direccion, capacidad, importe } = req.body; 
    const valores = [titulo, direccion, capacidad, importe, salon_id]; 
    const sql2 = 'UPDATE salones SET titulo = ?, direccion = ?, capacidad = ?, importe = ? WHERE salon_id = ?';
    const [result] = await conexion.execute(sql2, valores);


    console.log(result);   
    res.json({
      estado: true,
      mensaje: `Salón con id ${salon_id} actualizado.`,
      salon: { 
        titulo, 
        direccion, 
        capacidad, 
        importe }
    });
    
  } catch (error) {
    console.log('Error en PUT /salones/:salon_id:', error);
    res.status(500).json({
      estado: false,
      mensaje: 'Error del servidor al actualizar salón.'
    });
  }
});


/// DELETE - Eliminar un salón (lógica) ///////

app.delete('/salones/:salon_id', async (req, res) => {
  try {
    const salon_id = req.params.salon_id;
    const sql = 'SELECT * FROM salones WHERE activo = 1 AND salon_id = ?';
    const [results] = await conexion.execute(sql, [salon_id]);
    
    if (results.length === 0) { 
      return res.status(404).json({
        estado: false,
        mensaje: 'El Salón no existe.'
      });
    } 

    const sql2 = 'UPDATE salones SET activo = 0 WHERE salon_id = ?';
    const [result] = await conexion.execute(sql2, [salon_id]);
    console.log(result);
    
    res.json({
      estado: true,
      mensaje: `Salón con id ${salon_id} eliminado.`
    });
  } catch (error) {
    console.log('Error en DELETE /salones/:salon_id:', error);
    res.status(500).json({  
      estado: false,
      mensaje: 'Error del servidor al eliminar salón.'
    });
  }

});


  // Cargar variables de entorno desde el archivo .env
process.loadEnvFile();

app.listen(process.env.PUERTO, () => {
  console.log('Servidor OK en puerto', process.env.PUERTO);
});

console.log('process.env.PUERTO:', process.env.PUERTO);
