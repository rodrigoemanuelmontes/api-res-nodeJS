import "dotenv/config";
import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './src/routes/products-routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Error interno del servidor' });
});

export const handler = serverless(app);
