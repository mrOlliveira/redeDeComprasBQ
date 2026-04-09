import express from 'express';
// Adicionamos o "src" aqui no caminho para ele achar o arquivo na pasta certa
import armariosroutes from './src/routes/armarios.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/', armariosroutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando lindamente na porta ${PORT}`);
});