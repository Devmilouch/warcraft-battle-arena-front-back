import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import userModel from "./sequelizeModels/user.model.js";
import unitModel from "./sequelizeModels/unit.model.js";
import dotenv from "dotenv";

dotenv.config();

//Initialization of sequelize
const sequelize = new Sequelize(
    "team_battle_warcraft",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mariadb",
        dialectOptions: {
            timezone: "Etc/GMT-2"
        },
        loggin: false
    }
);

//Instances of models
export const userModelInstance = userModel(sequelize, DataTypes);
export const unitModelInstance = unitModel(sequelize, DataTypes);

//Synchronization between sequelize and the DB
export const initDB = () => {
    sequelize.sync({ force: true })
    .then(_ => {
        console.log("Données synchronisée avec la DB !");

        for (let i = 0 ; i < 10 ; i++) {
            unitModelInstance.create({
                name: `Test${i}`,
                type: "Hero",
                cost: 10,
                attack: 15,
                hp: 50,
                picture: "https://main.judgehype.com/images/froala/2021/10/1633599475_837161.png"
            });
        }

        bcrypt.hash("Warcraft", 10)
        .then(hash => {
            userModelInstance.create({
                username: "Darmi",
                password: hash,
                gold: 60,
                team: ["Test0", "Test1", "Test5", "Test3"]
            })
            .then(user => console.log(user.toJSON()));
        })
    })
    .catch(error => console.log(`Problème de synchronisation avec la DB : ${error}`));
}