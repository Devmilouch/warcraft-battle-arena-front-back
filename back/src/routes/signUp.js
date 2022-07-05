import { userModelInstance } from "../models/sequelize.model.js";
import bcrypt from "bcrypt";
import { ValidationError, UniqueConstraintError } from "sequelize";

const signUp = app => {
    app.post("/api/sign-up", (req, res) => {
        if (!req.body.username || !req.body.password) return res.status(401).json({ message: "Veuillez entrer toutes vos informations de connexion." });

        if(typeof req.body.username !== "string" || (req.body.username.length < 3 || req.body.username.length > 15)) return res.status(401).json({ message: "Le nom d'utilisateur doit être une chaîne de caractères de 3 à 15 caractères.", data: req.body.username });

        if (req.body.password.length < 4 || req.body.password.length > 30) return res.status(401).json({ message: "Mot de passe doit contenir de 4 à 30 caractères." });

        userModelInstance.findOne({ where: {username: req.body.username} })
        .then(user => {
            if (user) return res.status(401).json({ message: "L'utilisateur existe déjà." })
            else {
                return bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    return userModelInstance.create({
                        username: req.body.username,
                        password: hash,
                        gold: 140
                    })
                    .then(userCreated => {
                        console.log(userCreated.toJSON());
                        res.json({ message: "Compte créé avec succès.", data: { username: userCreated.username } });
                    });
                })
            }
        })
        .catch(error => {
            if (error instanceof ValidationError) return res.status(400).json({ message: error.message, data: error });
            if (error instanceof UniqueConstraintError) return res.status(400).json({ message: error.message, data: error });

            return res.status(500).json({  message: "Problème de communication avec la base de données. Réessayez dans quelques instants.", data: error });
        });
    });
}

export default signUp;