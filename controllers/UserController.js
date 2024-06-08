// UserController.js отвечает за работу с пользователями (регистрация, авторизация)

import jwt from 'jsonwebtoken'; // загружаем библиотеку jwt
import bcrypt from 'bcrypt'; // загружаем библиотеку bcrypt для шифрования пароля
import { validationResult } from 'express-validator'; // загружаем validationResult - функцию для проверки валидности данных из библиотеки express-validator 
import UserModel from '../models/User.js'; // загружаем модель пользователя

// регистрация пользователя (регистрация)
export const register = async( req, res ) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            });
        }
    
        // шифруем пароль
        const password = req.body.password; // получаем пароль из тела запроса 
        const salt = await bcrypt.genSalt(10); // генерируем соль для шифрования пароля
        const hash = await bcrypt.hash(password, salt); // шифруем пароль с помощью соли
    
        // создаем нового пользователя
        const doc = new UserModel({	
            email: req.body.email, // сохраняем email пользователя 
            fullName: req.body.fullName, // сохраняем имя пользователя
            avatarUrl: req.body.avatarUrl, // сохраняем ссылку на аватарку
            passwordHash: hash, // сохраняем хеш пароля
        });
    
        // сохраняем пользователя в базу данных
        const user = await doc.save();

        // генерируем токен для пользователя
        const token = jwt.sign(
            {
                _id: user._id
            }, 
            'secret123', 
            {
                expiresIn: '30d'
            }
        );

        // удаляем пароль из объекта пользователя c помощью деструктуризации
        /*  
            КАК РАБОТАЕТ ДЕСТРУКТУРИЗАЦИЯ:
            Эта строка выполняет следующие действия:
            Деструктуризация passwordHash: Значение свойства passwordHash извлекается из объекта user._doc 
            и присваивается переменной passwordHash.
            Остальные свойства: Оставшиеся свойства объекта user._doc (все, кроме passwordHash) 
            объединяются в новый объект userData.
        */  
        const { passwordHash, ...userData } = user._doc
        
        // возвращаем пользователя
        res.json({
            ...userData,
            token
        });

    } catch (err) {
        console.log(err); // показываем ошибку в консоли
        
        // возвращаем ошибку пользователю
        res.status(500).json({ message: 'Некорректные данные при регистрации' }); 
    }
}

// авторизация пользователя (авторизация)
export const login = async( req, res ) => {
    try {
        // Проверяем есть ли такой пользователь
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Сравниваем пароли
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        // генерируем токен для пользователя
        const token = jwt.sign(
            {
                _id: user._id
            }, 
            'secret123', 
            {
                expiresIn: '30d'
            }
        );

        // удаляем пароль из объекта пользователя c помощью деструктуризации
        /*  
            КАК РАБОТАЕТ ДЕСТРУКТУРИЗАЦИЯ:
            Эта строка выполняет следующие действия:
            Деструктуризация passwordHash: Значение свойства passwordHash извлекается из объекта user._doc 
            и присваивается переменной passwordHash.
            Остальные свойства: Оставшиеся свойства объекта user._doc (все, кроме passwordHash) 
            объединяются в новый объект userData.
        */  
            const { passwordHash, ...userData } = user._doc
        
            // возвращаем пользователя
            res.json({
                ...userData,
                token
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Не удалось авторизоваться' });
    }
}

// получение информации о пользователе
export const getMe = async( req, res ) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const { passwordHash, ...userData } = user._doc
        
        // возвращаем пользователя
        res.json({userData});

    } catch (error) {
        res.status(500).json({ message: 'Нет доступа' });
    }
}