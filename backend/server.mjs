import express from 'express';
import connectDB from './config/db.mjs';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.mjs';
const app = express();

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:8101', 'http://192.168.0.198:8101'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Conectar a MongoDB
connectDB();

app.use(express.json());
app.use('/api', taskRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 8100;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));