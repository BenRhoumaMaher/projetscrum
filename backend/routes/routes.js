import express from "express";
import mongoose from "mongoose";
import User from "../model/userModel.js";

const router = express.Router();

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



export default router;
