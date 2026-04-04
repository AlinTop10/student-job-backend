import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../db'; 

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare idUser: CreationOptional<number>; // CreationOptional înseamnă că e Auto-Increment (nu-l trimiți tu)
    declare nume: string;
    declare telefon: string;
    declare email: string;
    declare password: string;
    declare created_at: CreationOptional<Date>;
    declare isActivated: CreationOptional<boolean>;
    declare activationLink: CreationOptional<string>;
}

User.init(
    {
        idUser: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nume: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        telefon: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isActivated:{
            type: DataTypes.BOOLEAN,
            defaultValue: false 
        },
        activationLink:{
            type: DataTypes.STRING
        }
    },
    {
        sequelize, // Instanța de conexiune
        tableName: 'users',
        timestamps: false, // Dacă în MySQL ai doar created_at, nu și updatedAt
    }
);

export { User };