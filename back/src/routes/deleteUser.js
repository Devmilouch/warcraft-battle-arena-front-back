import auth from "../auth/auth.js";
import { userModelInstance } from "../models/sequelize.model.js";

const deleteUser = app => {
    app.delete("/api/delete-user", auth, (req, res) => {
        const id = req.userInformations.userId;

        userModelInstance.findByPk(id)
        .then(user => {
            if (!user) return res.status(404).json({ message: "L'utilisateur que vous voulez supprimer n'existe pas." });

            const deletedUser = user.username;
            userModelInstance.destroy({ where: {id} })
            .then(_ => {
                return res.json({ message: `L'utilisateur ${deletedUser} a bien été supprimé.` });
            })
            .catch(error => {
                return res.json({ message: `Impossible de supprimer l'utilisateur ${deletedUser}.`, data: error })
            });
        })
        .catch(error => {
            return res.json({ message: "Impossible d'accéder à la base de données.", data: error })
        });
    });
}

export default deleteUser;