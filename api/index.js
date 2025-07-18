// index.js

import "dotenv/config"; // Carga las variables de entorno

import express from 'express';
import serverless from 'serverless-http'; // Importa serverless-http
import cors from 'cors';
import bodyParser from 'body-parser';
// Rutas corregidas para que funcionen desde la raíz del proyecto
import productRoutes from '../src/routes/products-routes.js';
import authRoutes from '../src/routes/auth.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);

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

// --- Lógica para desarrollo local ---
// Esta parte solo se ejecutará si no estamos en un entorno serverless (Vercel)
// Vercel no ejecuta app.listen, solo busca el 'handler' exportado.
if (!process.env.VERCEL_ENV) { // Si VERCEL_ENV no está definido, asumimos desarrollo local
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        console.log(`JWT_SECRET cargada: ${process.env.JWT_SECRET ? 'Sí' : 'No'}`);
    });
}

// --- Exportación para Serverless ---
// Esta línea DEBE estar en el nivel superior del módulo para que 'export' sea válido.
// serverless(app) crea y devuelve el handler para Vercel.
export const handler = serverless(app);