import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize } from './db'; 
import mainRouter from './router';
import errorMiddleware from './middleware/error-middleware';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', mainRouter);
app.use(errorMiddleware);


const start = async () => {
    try {
        // IMPORTANT: Nu mai folosim 'pool'. Cu Sequelize folosim 'authenticate()'
        await sequelize.authenticate(); 
        console.log('Conectare reusita la MySQL via Sequelize');

        // Sincronizarea modelelor cu baza de date (opțional, dar util)
        // await sequelize.sync(); 

        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        // În TS, 'e' trebuie tratat ca Error pentru a accesa .message
        console.log('eroare - ', (e as Error).message);
    }
}

start();