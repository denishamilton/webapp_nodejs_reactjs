// загружаем библиотеку express-validator для валидации данных от пользователя
import { body } from "express-validator";

// валидация данных от пользователя (авторизация) 
export const loginValidation = [
    body('email', 'Некорректный email').isEmail(), // проверка на email адрес пользователя (должен быть валидным)
    body('password', 'Минимальная длина пароля 5 и максимальная 32 символов').isLength({ min: 5, max: 32 }).isAlphanumeric(), // проверка на пароль пользователя (должен быть валидным) isAlphanumeric - только буквы и цифры
];

// валидация данных от пользователя (регистрация) 
export const registerValidation = [
    body('email', 'Некорректный email').isEmail(), // проверка на email адрес пользователя (должен быть валидным)
    body('password', 'Минимальная длина пароля 5 и максимальная 32 символов').isLength({ min: 5, max: 32 }).isAlphanumeric(), // проверка на пароль пользователя (должен быть валидным) isAlphanumeric - только буквы и цифры
    body('fullName', 'Минимальная длина полного имени 3 и максимальная 32 символов').isLength({ min: 3, max: 32 }), // проверка на полное имя пользователя (должен быть валидным)
    body('avatarUrl', 'Некорректная ссылка на аватарку').optional().isURL(), // проверка на ссылку на аватарку является ли эта ссылка URL или нет
];

// валидация данных от пользователя (создание поста)
export const postCreateValidation = [
    body('title', 'Введите заголовок поста').isLength({ min: 3}).isString(),
    body('text', 'Введите текст поста').isLength({ min: 1}).isString(),
    body('tags', 'Неверные теги').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]