// PostController.js отвечает за работу с постами

import PostModel from '../models/Post.js';

// создание поста
export const create = async(req, res) => {
    try {
        // подготовка документа поста, важно перед созданием поста
        const doc = new PostModel({
            title: req.body.title, // получаем заголовок
            text: req.body.text, // получаем текст поста
            imageUrl: req.body.imageUrl, // получаем ссылку на изображение
            tags: req.body.tags, // получаем массив тегов
            user: req.userId // получаем _id пользователя
        });

        // сохраняем пост в базу данных
        const post = await doc.save();

        // возвращаем созданный пост
        res.json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Не удалось создать пост' });
    }
}