import express from "express";
import mongoose from "mongoose";
import User from "../model/userModel.js";
import { login } from '../controller/controller.js';
import { logout } from '../controller/controller.js';

const router = express.Router();
// Route pour se connecter
router.post('/login', login);

//Route pour se déconnecter
router.post('/logout', logout);
//lister les utilisateurs
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

// Ajouter un utilisateur
router.post("/add", async (req, res) => {
    try {
        const { username, name, email,address,city,phone, password, role } = req.body;
        const user = new User({ username, name, email,address,city,phone, password, role });
        await user.save();
        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error });
    }
});



export default router;
