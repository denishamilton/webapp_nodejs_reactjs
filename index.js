import express from 'express'; // загружаем библиотеку express 
import dotenv from 'dotenv'; // загружаем библиотеку dotenv
import mongoose from 'mongoose'; // загружаем библиотеку mongoose
import { registerValidation, loginValidation, postCreateValidation } from './validations.js'; // загружаем файл с валидацией при регистрации
import checkAuth from './utils/checkAuth.js';

// Первый способ импорта контроллеров
// import { register, login, getMe } from './controllers/UserController.js';

// Второй способ импорта контроллеров, Сохраняя все контроллеры в переменную UserController
import * as UserController from './controllers/UserController.js';

// Импорт контроллера постов
import * as PostController from './controllers/PostController.js';

mongoose
.connect(
    'mongodb+srv://denysgorozhanin:sS111222333s@cluster0.jkl5y4u.mongodb.net/blog_db?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log('MongoDB connected'))
.catch( (error) => console.log(error) );

// загружаем файл с настройками приложения (файл .env)
dotenv.config();

// создаем приложение express (сервер)
const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

// позволяет обрабатывать json данные от пользователя
app.use(express.json());

// авторизация пользователя (авторизация),
app.post('/auth/login', loginValidation , UserController.login)

// регистрация пользователя (регистрация), registerValidation - валидация
app.post('/auth/register', registerValidation, UserController.register);

// получение информации о пользователе
app.get('/auth/me', checkAuth, UserController.getMe);

// получение всех постов
app.get('/posts', PostController.getAll);

// получение одного поста
app.get('/posts/:id', PostController.getOne);

// создание поста
app.post('/posts', checkAuth , postCreateValidation , PostController.create);

// удаление поста
app.delete('/posts/:id', checkAuth, PostController.remove);

// обновление поста
// app.patch('/posts, PostController.update);

// запускаем сервер
const port = process.env.PORT || 5000;
app.listen(port, () => {
    try {
        console.log(`Сервер запущен на порту ${port}`);
    } catch (error) {
        console.log(error);
    }
});