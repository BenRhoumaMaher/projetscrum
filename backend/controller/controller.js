//on va definir les crud ici la relation est avec user routes et user model
import User from "../model/userModel.js";

const createUser = async (req, res) => {
    const body = req.body;
    try {
      // Crée un nouvel utilisateur
      const user = new User({
        username: body.username,
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role || 'user'
      });
  
      // Sauvegarder dans la base de données
      const createdUser = await user.save();
  
      // Répondre avec l'utilisateur créé
      res.status(201).json(createdUser);
    } catch (error) {
      console.error('Error during user creation:', error);  // Afficher l'erreur dans la console pour mieux comprendre le problème
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
  };
  

