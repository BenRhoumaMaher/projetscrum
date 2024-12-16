
import express from 'express'; // Framework Express
import dotenv from 'dotenv'; // Gestion des variables d'environnement
import mongoose from 'mongoose'; // Connexion à MongoDB
import connectDB from './BD/bd.js'; 
import userRoutes from './routes/routes.js'; // Import des routes utilisateurs
// Charger les variables d'environnement
dotenv.config();


// Initialiser l'application Express
const app = express();


// Middleware pour parser les données JSON dans les requêtes
app.use(express.json());

// Connexion à MongoDB

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

// Appeler la fonction de connexion à MongoDB
connectDB();

// Configurer les routes
app.use('/api/users', userRoutes);

// Vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});
