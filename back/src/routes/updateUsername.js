import auth from "../auth/auth.js";
import { userModelInstance } from "../models/sequelize.model.js";
import { ValidationError, UniqueConstraintError } from "sequelize";

const updateUsername = app => {
    app.put("/api/update-username", auth, (req, res) => {
        if (!req.body.username) return res.status(401).json({ message: "Veuillez indiquer le nouveau nom d'utilisateur dans la propriété username." });
        if(typeof req.body.username !== "string" || (req.body.username.length < 3 || req.body.username.length > 15)) return res.status(401).json({ message: "Le nom d'utilisateur doit être une chaîne de caractères comprise entre 3 et 15 caractères.", data: req.body.username });

        const id = req.userInformations.userId;

        userModelInstance.findByPk(id)
        .then(user => {
            if (!user) return res.status(404).json({ message: "L'utilisateur n'existe pas." });
            else if (user.username === req.body.username) return res.status(400).json({ message: "Le nouveau nom est identique à l'ancien." });
            else {
                if (req.body.username) {
                    const updatedUser = {...user, username: req.body.username};
                    return userModelInstance.update(updatedUser, { where: {id} })
                    .then(_ => {
                        res.json({ message: `L'utilisateur ${user.username} a bien été changé en ${req.body.username}.`, data: {username: req.body.username} });
                    });
                };
            };
        })
        .catch(error => {
            if (error instanceof ValidationError) return res.status(400).json({ message: error.message, data: error });
            if (error instanceof UniqueConstraintError) return res.status(400).json({ message: error.message, data: error });

            res.status(500).json({ message: "Problème de communication avec la base de données. Réessayez dans quelques instants.", data: error });
        });
    });
}

export default updateUsername;