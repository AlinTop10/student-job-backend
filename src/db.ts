// db.ts
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize( // <-- ASIGURĂ-TE CĂ AI EXPORT AICI
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);