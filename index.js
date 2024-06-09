import express from 'express'; // загружаем библиотеку express 
import dotenv from 'dotenv'; // загружаем библиотеку dotenv
import mongoose from 'mongoose'; // загружаем библиотеку mongoose
import multer from 'multer'; // загружаем библиотеку multer для работы с файлами

import { registerValidation, loginValidation, postCreateValidation } from './validations.js'; // загружаем файл с валидацией при регистрации

// импортируем контроллеры из папки controllers
import { UserController, PostController } from './controllers/index.js';

// импортируем функцию для проверки авторизации и обработки ошибок
import { handleValitationsErrors , checkAuth } from './utils/index.js';


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

// создаём хранилище для multer и указываем папку, в которую будут загружаться файлы
const storage = multer.diskStorage({
    // destination - папка(функция, которая ожидает параметры: req, file, cb), в которую будут загружаться файлы. cb - функция обратного вызова callback
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    // filename - имя загружаемого файла, originalname - присваиваем оригинальное имя файла
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

// присваимваем хранилище для multer
const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send('Hello');
});

// позволяет обрабатывать json данные от пользователя
app.use(express.json());

// показываем express где храниться статические файлы, express.static - показывает статические файлы
app.use('/uploads', express.static('uploads'));

// авторизация пользователя (авторизация),
app.post('/auth/login', loginValidation , handleValitationsErrors, UserController.login)

// регистрация пользователя (регистрация), registerValidation - валидация
app.post('/auth/register', registerValidation, handleValitationsErrors, UserController.register);

// получение информации о пользователе
app.get('/auth/me', checkAuth, UserController.getMe);

// получение всех постов
app.get('/posts', PostController.getAll);

// получение одного поста
app.get('/posts/:id', PostController.getOne);

// создание поста
app.post('/posts', checkAuth , postCreateValidation , handleValitationsErrors, PostController.create);

// удаление поста
app.delete('/posts/:id', checkAuth, PostController.remove);

// обновление поста
app.patch('/posts/:id', checkAuth , postCreateValidation , handleValitationsErrors, PostController.update);

// загрузка изображения
app.post('/upload', checkAuth , upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
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