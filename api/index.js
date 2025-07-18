import "dotenv/config"; 

import express from 'express';
import serverless from 'serverless-http'; 
import cors from 'cors';
import bodyParser from 'body-parser';

import productRoutes from './src/routes/products-routes.js'; 
import authRoutes from './src/routes/auth.routes.js';     

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas con prefijo /api
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Ruta no encontrada (404)
app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Error interno del servidor' });
});

// NO usar app.listen() en Vercel, exportar handler para serverless
export const handler = serverless(app);
