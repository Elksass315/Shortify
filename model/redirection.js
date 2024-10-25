import { sequelize } from "../startup/DB.js";
import { DataTypes } from "sequelize";

export const Redirection = sequelize.define("Redirection", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    to: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['from'],
        },
    ],
});

Redirection.sync();
export default Redirection;