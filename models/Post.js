import mongoose from "mongoose"; // импортируем библиотеку mongoose для работы с базой данных MongoDB

// схема модели пользователя (поля и типы данных)
const PostSchema = new mongoose.Schema({

    // Заголовок поста
    title: {
        type: String, // тип данных
        required: true, // required - обязательное поле
        // unique: true  // unique - уникальное поле
    },

    // Текст поста
    text: {
        type: String, // тип данных
        required: true, // required - обязательное поле
    },
    
    // Массив тегов
    tags: {
        type: Array, // тип данных
        default: [] // default - значение по умолчанию, !!! приходит пустой массив если ничего нет
    },
    
    // Число просмотров поста
    viewsCount: {
        type: Number, // тип данных
        default: 0 // default - значение по умолчанию
    },
    
    // Автор поста
    user: {
        type: mongoose.Schema.Types.ObjectId, // в качестве ссылки на пользователя принимаем _id
        ref: 'User', // ref - ссылка на модель пользователя, тоесть будет ссылаться на модель User, Создаётся связь между двумя таблицами или моделями
        required: true // required - обязательное поле
    },

    imageUrl: String // поле для хранения ссылки на аватарку НЕОБЯЗАТЕЛЬНО

}, {
    timestamps: true, // поле для хранения даты создания и обновления данных АВТОМАТИЧЕСКИ
});

// экспортируем модель пользователя
export default mongoose.model('Post', PostSchema);