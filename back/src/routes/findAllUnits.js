import { Op } from "sequelize";
import { unitModelInstance } from "../models/sequelize.model.js";

const findAllUnits = app => {
    app.get("/api/all-units", (req, res) => {
        if (req.query.name) {
            if (req.query.length < 2) return res.status(400).json({ mesage: "Minimum 2 caractères requis pour la recherche d'unités." });

            const name = req.query.name;
            const limit = req.query.limit ? parseInt(req.query.limit) : null;

            return unitModelInstance.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                limit: limit,
                order: ["name"]
            })
            .then(({ count, rows }) => {
                const message = count > 0 ? `Il y a ${count} unités qui correspondent au terme de recherche ${name}` : `Aucune unité ne correspond à ${name}`;
                const code = count > 0 ? 200 : 404;
                
                const unitsList = [];
                rows.forEach(unit => {
                    unitsList.push({
                        name: unit.name,
                        type: unit.type,
                        cost: unit.cost,
                        attack: unit.attack,
                        hp: unit.hp,
                        skillName: unit.skillName,
                        skillDescription: unit.skillDescription,
                        picture: unit.picture
                    });
                });

                res.status(code).json({ message, data: unitsList });
            });
        } else {
            unitModelInstance.findAll({ order: ["name"] })
            .then(units => {
                const unitsList = [];
                units.forEach(unit => {
                    unitsList.push({
                        name: unit.name,
                        type: unit.type,
                        cost: unit.cost,
                        attack: unit.attack,
                        hp: unit.hp,
                        skillName: unit.skillName,
                        skillDescription: unit.skillDescription,
                        picture: unit.picture
                    });
                });

                res.json({ message: "La liste des unités a bien été récupérée.", data: unitsList });
            })
            .catch(error => {
                res.status(500).json({ message: "La récupération des unités a échouée.", data: error });
            });
        };
    });
}

export default findAllUnits;