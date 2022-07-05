import { userModelInstance } from "../models/sequelize.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { privateKey } from "../auth/private_key.js";
import { ValidationError, UniqueConstraintError } from "sequelize";

const signIn = app => {
    app.post("/api/sign-in", (req, res) => {
        if (!req.body.username || !req.body.password) return res.status(401).json({ message: "Veuillez entrer toutes vos informations de connexion.", data: {username: req.body.username, password: req.body.password, reqBody: req.body} });

        userModelInstance.findOne({ where: {username: req.body.username} })
        .then(user => {
            if (!user) return res.status(404).json({message: "L'utilisateur n'existe pas."});

            bcrypt.compare(req.body.password, user.password)
            .then(isPasswordValid => {
                if (!isPasswordValid) return res.status(401).json({ message: "Mot de passe incorrect." });

                const token = jwt.sign({ userId: user.id }, privateKey, { expiresIn: "24h" });
                
                return res.json({ message: "L'utilisateur a été connecté avec succès.", data: { username: user.username, gold: user.gold }, token});
            });
        })
        .catch(error => {
            if (error instanceof ValidationError) return res.status(400).json({ message: error.message, data: error });
            if (error instanceof UniqueConstraintError) return res.status(400).json({ message: error.message, data: error });

            return res.json({  message: "Problème de connexion à la base de données. Réessayez dans quelques instants.", data: error });
        });
    });
}

export default signIn;