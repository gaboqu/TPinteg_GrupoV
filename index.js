import express from 'express';
const app = express();


app.get('/estado', (req, res) => {
    res.json({'ok':true});
});

app.listen(3000, () => {
    console.log('Servidor OKww');
});

console.log('process.env.PUERTO:', process.env.PUERTO);