//on va definir les crud ici la relation est avec user routes et user model
import User from "../model/userModel.js";




const login = (req, res) => {
    const { username, password } = req.body; // Récupère les données envoyées
    if (username === 'admin' && password === '1234') {
        res.status(200).send({ message: 'Connexion réussie !' });
    } else {
        res.status(401).send({ message: 'Identifiants incorrects.' });
    }
};
//logout
const logout = (req, res) => {
    res.status(200).send({ message: 'Déconnexion réussie !' });
}

// Créer un utilisateur
const createUser = async (req, res) => {
    const body = req.body;
    try {
        const user = new User({
            username: body.username,
            name: body.name,
            email: body.email,
            phone: body.phone,
            city: body.city,
            address: body.address,
            password: body.password,
            role: body.role || 'user'
        });

        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error) {
        console.error('Error during user creation:', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
};



export { createUser, login,logout};

  

