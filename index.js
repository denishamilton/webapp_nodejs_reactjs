import express from 'express'; // загружаем библиотеку express 
import dotenv from 'dotenv'; // загружаем библиотеку dotenv
import jwt from 'jsonwebtoken'; // загружаем библиотеку jwt
import mongoose from 'mongoose'; // загружаем библиотеку mongoose
import { validationResult } from 'express-validator'; // загружаем validationResult - функцию для проверки валидности данных из библиотеки express-validator 

import { registerValidation } from './validations/auth.js';

import UserModel from './models/User.js';

mongoose
.connect(
    'mongodb+srv://denysgorozhanin:sS111222333s@cluster0.jkl5y4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log('MongoDB connected'))
.catch( (error) => console.log(error) );

// загружаем файл с настройками приложения (файл .env)
dotenv.config();

// создаем приложение express (сервер)
const app = express();

// позволяет обрабатывать json данные от пользователя
app.use(express.json());

// регистрация пользователя (регистрация), registerValidation - валидация
app.post('/auth/register', registerValidation,( req, res ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Некорректные данные при регистрации'
        });
    }

    // создаем нового пользователя 
    const doc = new UserModel({	
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: req.body.password
    });

    res.json({
        success: true, 
        message: 'Регистрация прошла успешно' 
    });

});

// запускаем сервер
const port = process.env.PORT || 5000;
app.listen(port, () => {
    try {
        console.log(`Сервер запущен на порту ${port}`);
    } catch (error) {
        console.log(error);
    }
});