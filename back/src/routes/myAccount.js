import auth from "../auth/auth.js";
import { userModelInstance } from "../models/sequelize.model.js";

const myAccount = app => {
    app.get("/api/my-account", auth, (req, res) => {
        const id = req.userInformations.userId;
        userModelInstance.findByPk(id)
        .then(user => {
            if (!user) res.status(404).json({ message: "L'utilisateur n'existe pas." });
            else {
                const userInformations = {
                    username: user.username,
                    gold: user.gold,
                    team: user.team
                };
                res.json({ message: `L'utilisateur ${user.username} a bien été récupéré.`, data: userInformations });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "La récupération de l'utilisateurs a échouée.", data: error });
        });
    });
}

export default myAccount;