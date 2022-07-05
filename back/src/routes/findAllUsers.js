import { Op } from "sequelize";
import { userModelInstance } from "../models/sequelize.model.js";

const findAllUsers = app => {
    app.get("/api/all-users", (req, res) => {
        if (req.query.username) {
            if (req.query.username.length < 2) return res.status(400).json({ mesage: "Minimum 2 caractères requis pour la recherche d'utilisateurs." });

            const username = req.query.username;
            const limit = req.query.limit ? parseInt(req.query.limit) : null;

            return userModelInstance.findAndCountAll({
                where: {
                    username: {
                        [Op.like]: `%${username}%`
                    }
                },
                limit: limit,
                order: ["username"]
            })
            .then(({ count, rows }) => {
                const message = count > 0 ? `Il y a ${count} utilisateurs qui correspondent au terme de recherche ${username}` : `Aucun utilisateur ne correspond à ${username}`;
                const code = count > 0 ? 200 : 404;
                
                const usersList = [];
                rows.forEach(user => {
                    usersList.push({
                        username: user.username,
                        gold: user.gold,
                        team: user.team
                    });
                });

                res.status(code).json({ message, data: usersList });
            });
        } else {
            userModelInstance.findAll({ order: ["username"] })
            .then(users => {
                const usersList = [];
                users.forEach(user => {
                    usersList.push({
                        username: user.username,
                        gold: user.gold,
                        team: user.team
                    });
                });

                res.json({ message: "La liste des utilisateurs a bien été récupérée.", data: usersList });
            })
            .catch(error => {
                res.status(500).json({ message: "La récupération des utilisateurs a échouée.", data: error });
            });
        };
    });
}

export default findAllUsers;