import auth from "../auth/auth.js";
import { userModelInstance, unitModelInstance } from "../models/sequelize.model.js";
import { ValidationError, UniqueConstraintError } from "sequelize";

const updateUserTeam = app => {
    app.put("/api/update-user-team", auth, (req, res) => {
        if (!req.body.team || !Array.isArray(req.body.team)) return res.status(401).json({ message: "Veuillez indiquer la nouvelle équipe et/ou au bon format." });

        const id = req.userInformations.userId;
        userModelInstance.findByPk(id)
        .then(user => {
            if (!user) res.status(404).json({ message: "L'utilisateur n'existe pas." });
            else {
                try {

                    if (req.body.team && req.body.team.length > 0) {
                        let totalOfGold = user.gold;
                        const newTeam = req.body.team;

                        return unitModelInstance.findAll()
                        .then(units => {
                            const allUnitsName = units.map(unit => {
                                return unit.name;
                            });

                            let invalidUnitDetected = false;
                            const allInvalidUnits = [];
                            newTeam.forEach(newTeamUnit => {
                                if (!allUnitsName.includes(newTeamUnit)) {
                                    invalidUnitDetected = true;
                                    allInvalidUnits.push(newTeamUnit);
                                }
                            });

                            if (invalidUnitDetected) return res.status(401).json({ message:` Une ou plusieurs unités n'existent pas, vérifiez les données envoyées !`, data: allInvalidUnits });

                            if (user.team) {
                                user.team.forEach(actualTeamUnit => {
                                    units.forEach(unit => {
                                        if (unit.name === actualTeamUnit) {
                                            totalOfGold += unit.cost;
                                            console.log(totalOfGold, unit.cost)
                                        };
                                    });
                                });
                            }
                                newTeam.forEach(newTeamUnit => {
                                    console.log(newTeamUnit);
                                    units.forEach(unit => {
                                        if (unit.name === newTeamUnit) {
                                            totalOfGold -= unit.cost;
                                            console.log(totalOfGold, unit.cost);
                                        };
                                    });
                                });

                                if (totalOfGold >= 0) {
                                    const updatedUserTeamAndGold = {...user, gold: totalOfGold, team: newTeam};
                                    return userModelInstance.update(updatedUserTeamAndGold, { where: {id} })
                                    .then(_ => {
                                        const updatedUser = {
                                            username: user.username,
                                            gold: totalOfGold,
                                            team: newTeam
                                        }
                                        return res.json({ message: `L'or et l'équipe du joueur ${user.username} ont bien été modifiés.`, data: updatedUser });
                                    })   
                                } else {
                                    return res.status(401).json({ message: "L'utilisateur n'a pas assez d'or pour créer cette équipe." });
                                }
                        })
                    } else {
                        return res.status(401).json({ message: "Format de la team non valide !" });
                    }

                } catch (error) {
                    if (error instanceof ValidationError) return res.status(400).json({ message: error.message, data: error });
                    if (error instanceof UniqueConstraintError) return res.status(400).json({ message: error.message, data: error });

                    return res.status(500).json({ message: "Problème serveur lors de l'update de la team." });

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

export default updateUserTeam;