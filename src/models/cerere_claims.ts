import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import { sequelize } from "../db";

class  CerereClaim extends Model <
    InferAttributes<CerereClaim>,
    InferCreationAttributes<CerereClaim>
> {
    declare id: CreationOptional<number>;
    declare cerere_id: number;
    declare nume_student: string;
    declare email_student: string;
    declare telefon_student: string; 
}

CerereClaim.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        cerere_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true
        },

        nume_student: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        email_student: {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        telefon_student: {
            type: DataTypes.STRING(30),
            allowNull: false,
        }
    },
    {
        sequelize, 
        tableName: "cerere_claims",
        timestamps: false,
    }
);

export {CerereClaim};