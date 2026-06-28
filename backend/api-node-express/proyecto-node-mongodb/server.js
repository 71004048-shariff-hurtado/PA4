const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const conectarDB = require('./config/database');
const cursoRoutes = require('./routes/cursoRoutes');
const authRoutes = require('./routes/authRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false // Permite que se compartan imágenes u otros recursos si fuera necesario
}));
app.use(cors());
app.use(express.json({ limit: '10kb'}));

// Conectar a la base de datos e iniciar el servidor
async function iniciarServidor() {
    await conectarDB();

    // Rutas de la API
    app.use('/api', cursoRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/inscripciones', enrollmentRoutes);

    const PORT = process.env.PORT || 3000; // Por defecto corre en puerto 3000 del archivo .env

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}

iniciarServidor();
