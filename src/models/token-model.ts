import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../db'; 

class Tokens extends Model<InferAttributes<Tokens>, InferCreationAttributes<Tokens>> {
    declare idToken: CreationOptional<number>; // CreationOptional înseamnă că e Auto-Increment (nu-l trimiți tu)
    declare user: string;
    declare refreshToken: string;
}

Tokens.init(
    {
        idToken: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },
    {
        sequelize, // Instanța de conexiune
        tableName: 'tokens',
    }
);

export { Tokens };