const unitModel = (sequelize, DataTypes) => {
    return sequelize.define("unit", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom de cette unité est déjà pris !"
            },
            validate: {
                notEmpty: { msg: "Le nom ne doit pas être vide !" },
                notNull: { msg: "Le nom est obligatoire !" },
                isNameValid(value) {
                    if (typeof(value) !== "string") throw new Error("Le nom d'utilisateur doit être une chaîne de caractères.");
                }
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le type de l'unité ne doit pas être vide !" },
                notNull: { msg: "Le type de l'unité est obligatoire !" },
                isTypeValid(value) {
                    if (typeof(value) !== "string") throw new Error("Le nom d'utilisateur doit être une chaîne de caractères.");
                }
            }
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: { msg: "Utilisez uniquement des nombres entiers pour le coût de l'unité !" },
            validate: {
                notEmpty: { msg: "Le coût de l'unité ne doit pas être vide !" },
                notNull: { msg: "Le coût de l'unité est obligatoire !" }
            }
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: { msg: "Utilisez uniquement des nombres entiers pour définir l'attaque de l'unité !" },
            validate: {
                notEmpty: { msg: "L'attaque de l'unité ne doit pas être vide !" },
                notNull: { msg: "L'attaque de l'unité est obligatoire !" }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: { msg: "Utilisez uniquement des nombres entiers pour les points de vie de l'unité !" },
            validate: {
                notEmpty: { msg: "Les points de vie de l'unité ne doivent pas être vide !" },
                notNull: { msg: "Les points de vie de l'unité sont obligatoires !" }
            }
        },
        skillName: {
            type: DataTypes.STRING,
            validate: {
                isTypeValid(value) {
                    if (typeof(value) !== "string") throw new Error("Le nom de la capacité doit être une chaîne de caractères.");
                }
            }
        },
        skillDescription: {
            type: DataTypes.STRING,
            validate: {
                isTypeValid(value) {
                    if (typeof(value) !== "string") throw new Error("La description de la capacité doit être une chaîne de caractères.");
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isUrl: { msg: "Utilisez une url valide pour l'image." },
              notNull: { msg: "L'url est obligatoire." }
            }
        }
    });
}

export default unitModel;