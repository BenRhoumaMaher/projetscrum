import express from "express";
import mongoose from "mongoose";
import User from "../model/userModel.js";

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Ajouter un utilisateur
router.post("/add", async (req, res) => {
    try {
        const { username, name, email, password, role } = req.body;
        const user = new User({ username, name, email, password, role });
        await user.save();
        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error });
    }
});
// Supprimer un utilisateur
router.delete("/accounts/:id", async (req, res) => {
  const userId = req.params.id;

  // Vérifier si l'ID est valide
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID invalide" });
  }
  
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      // await user.deleteOne();
      res.json({ message: "Utilisateur supprimé avec succès !" });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la suppression", error });
  }
});



export default router;
 