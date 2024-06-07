import mongoose from "mongoose"; // импортируем библиотеку mongoose для работы с базой данных MongoDB

// схема модели пользователя (поля и типы данных)
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String, // тип данных
        required: true // required - обязательное поле
    },
    email: {
        type: String,
        required: true,
        unique: true  // unique - уникальное поле
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: String // поле для хранения ссылки на аватарку НЕОБЯЗАТЕЛЬНО
}, {
    timestamps: true, // поле для хранения даты создания и обновления данных АВТОМАТИЧЕСКИ
});

// экспортируем модель пользователя
export default mongoose.model('User', UserSchema);