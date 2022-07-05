import * as url from "url";
import express from "express";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import { initDB } from "./src/models/sequelize.model.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

//Init packages
app
.use(cors())
.use(favicon(url.fileURLToPath(new URL("./", import.meta.url)) + "favicon.ico"))
.use(bodyParser.json());

//Public static ressources
app.use(express.static(url.fileURLToPath(new URL("./", import.meta.url)) + "/public"));

//Synchronization with the DB
initDB();

//Endpoints
app.get("/", (req, res) => {
    res.json("Bienvenue sur Team Battle Warcraft :D !");
});

import signIn from "./src/routes/signIn.js";
signIn(app);

import signUp from "./src/routes/signUp.js";
signUp(app);

import findAllUsers from "./src/routes/findAllUsers.js";
findAllUsers(app);

import findAllUnits from "./src/routes/findAllUnits.js";
findAllUnits(app);

import myAccount from "./src/routes/myAccount.js";
myAccount(app);

import updateUsername from "./src/routes/updateUsername.js";
updateUsername(app);

import updateUserTeam from "./src/routes/updateUserTeam.js";
updateUserTeam(app);

import deleteUser from "./src/routes/deleteUser.js";
deleteUser(app);

//Error 404 endpoint
app.use(({ res }) => {
    res.status(404).json({ message: "Impossible de trouver la ressource demandée ! Essayez une autre route." });
});

//Launch server
app.listen(PORT, () => console.log(`App listening on port : ${PORT}`));