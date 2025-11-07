import express from 'express';

const app = express();// Creo la app de express

app.use(express.json()); // Middleware para parsear lo que reciba a JSON


app.get('/estado', (req, res) => {
    res.json({'ok':true});
});

app. post('/notificacion', (req, res) => {

    console.log(req.body);

    if(!req.body.fecha || !req.body.salon){ 
        return res.status(400).json({'estado':false, 'msg':'faltan datos obligatorios'});
    }

    res.json({'ok':true, 'msg':'POST recibido'});

});

process.loadEnvFile();// Cargar variables de entorno desde el archivo .env

app.listen(process.env.PUERTO, () => {// Pongo a escuchar el servidor en el puerto indicado en las variables de entorno
    console.log('Servidor OK');
});

console.log('process.env.PUERTO:', process.env.PUERTO);
