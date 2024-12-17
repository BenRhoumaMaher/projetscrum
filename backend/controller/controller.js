//on va definir les crud ici la relation est avec user routes et user model
import User from "../model/userModel.js";

// Créer un utilisateur
const createUser = async (req, res) => {
    const body = req.body;
    try {
        const user = new User({
            username: body.username,
            name: body.name,
            email: body.email,
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

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
    }
};

export { createUser, deleteUser };

  

