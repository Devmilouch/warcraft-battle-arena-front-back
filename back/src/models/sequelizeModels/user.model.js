const userModel = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom est déjà pris."
            },
            validate: {
                notEmpty: { msg: "Le nom d'utilisateur ne doit pas être vide !" },
                notNull: { msg: "Le nom d'utilisateur est obligatoire !" },
                isUsernameValid(value) {
                    if (typeof(value) !== "string") throw new Error("Le nom d'utilisateur doit être une chaîne de caractères.");
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le mot de passe ne doit pas être vide !" },
                notNull: { msg: "Le mot de passe est obligatoire !" },
                isPasswordValid(value) {
                    if (typeof(value) !== "string") throw new Error("Le nom de passe doit être une chaîne de caractères.");
                }
            }
        },
        gold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Indiquez une valeur pour l'or !" },
                notNull: { msg: "Le montant d'or de passe est obligatoire !" },
                isInt: { msg: "Utilisez uniquement des nombres entiers pour l'or'." },
                min: {
                    args: [0],
                    msg: "Minimum 0 pièce d'or requis."
                },
                max: {
                    args: [999],
                    msg: "Les nombre maximum d'or est 999"
                }
            }
        },
        team: {
            type: DataTypes.STRING,
            get() {
                if (this.getDataValue("team")) return this.getDataValue("team").split(",");
            },
            set(team) {
                if (team) this.setDataValue("team", team.join());
            },
            validate: {
               isTeamValid(value) {
                if (value) {
                    const convertedValue = value.split(",");
                    if (value && !Array.isArray(convertedValue)) throw new Error("Le format de l'équipe n'est pas valide.");
                };
               } 
            }
        }
    });
}

export default userModel;