import express from 'express';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/error.js';

dotenv.config();



const app = express();

app.use(cors());

app.use(errorHandler);

connectDB();
// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Démarrer le serveur
app.listen(process.env.PORT || 5000 , () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
