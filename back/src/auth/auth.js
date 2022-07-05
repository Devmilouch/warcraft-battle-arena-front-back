import jwt from "jsonwebtoken";
import { privateKey } from "./private_key.js";

const auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête." });
    };

    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, privateKey, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({ message: "L'utilisateur n'est pas autorisé à accéder à cette ressource.", data: error  });
        } else {
            req.userInformations = decodedToken;
            next();
        };
    });
}

export default auth;