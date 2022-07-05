import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import userModel from "./sequelizeModels/user.model.js";
import unitModel from "./sequelizeModels/unit.model.js";
import dotenv from "dotenv";

dotenv.config();

//Initialization of sequelize
let sequelize;
if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: "mariadb",
            dialectOptions: {
                timezone: "Etc/GMT-2"
            },
            loggin: true
        }
    );
} else {
    sequelize = new Sequelize(
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
};

//Instances of models
export const userModelInstance = userModel(sequelize, DataTypes);
export const unitModelInstance = unitModel(sequelize, DataTypes);

//Synchronization between sequelize and the DB
export const initDB = () => {
    sequelize.sync()
    .then(_ => {
        console.log("Données synchronisées avec la DB !");
    })
    .catch(error => console.log(`Problème de synchronisation avec la DB : ${error}`));
}