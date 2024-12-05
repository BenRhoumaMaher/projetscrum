const express = require('express');
//const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());


// Connexion à MongoDB Atlas
/*mongoose.connect('mongodb://admin26:admin98>@cluster0.fpbrt.mongodb.net/adminDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas:', err));

// Définir le modèle User pour l'admin
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },  // Rôle par défaut
});

const User = mongoose.model('User', userSchema);*/
//tester le fonctionnement du serveur 
app.get('/', (req, res) => {
  res.send('Serveur fonctionne correctement !');
});
// tester avec Postman
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  // Simule la validation des données
  if (!username || !password) {
    return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis.' });

  }
  res.status(201).json({ message: `Utilisateur ${username} enregistré avec succès !` });
});

  /*try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur admin
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Sauvegarder dans la base de données
    await newUser.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});*/



// Démarrer le serveur
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
