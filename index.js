// index.js

import "dotenv/config";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './src/routes/products-routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);

// Ruta no encontrada (404)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:${PORT}");
});