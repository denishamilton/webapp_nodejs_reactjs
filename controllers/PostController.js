// PostController.js отвечает за работу с постами

import PostModel from '../models/Post.js';

// получение всех постов
export const getAll = async(req, res) => {
    try {
        // получение всех постов с помощью populate (получение связанных данных), 
        //в этом случае получаем данные о пользователе, который создал пост, 
        // exec() - выполнение запроса в базу данных
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Не удалось получить посты' });
    }
}

// КОД АРЧАКОВА УСТАРЕВШИЙ ИЗЗА ОБНОВЛЕНИЙ В МОНГО_DB
// получение одного поста
// export const getOne = async(req, res) => {
//     try {
//         // чтобы вытащить динамический параметр из URL :id, используем req.params
//         // получение поста по id. params - параметры запроса. id - идентификатор поста
//         const postId = req.params.id;

//         // findOneAndUpdate - нахождение поста в базе и обновление его
//         PostModel.findOneAndUpdate({
//                 _id: postId
//             }, {
//                 // inc - увеличение значения viewsCount на 1
//                 $inc: { viewsCount: 1 },
//             },
//             {
//                 // returnDocument - возвращать обновленный документ, after - после обновления
//                 returnDocument: 'after'
//             },
//             (err, doc) => {
//                 // если не удалось вернуть пост
//                 if (err) {
//                     console.log(err);
//                     return res.status(500).json({
//                         message: 'Не удалось вернуть пост'
//                     });
//                 }
//                 // если пост не найден 
//                 if (!doc) {
//                     return res.status(404).json({
//                         message: 'Пост не найден'
//                     });
//                 }

//                 // если пост найден, возвращаем пост
//                 res.json(doc);
//             }
//         )

//         res.json(post);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Не удалось получить пост' });
//     }
// }


export const getOne = async (req, res) => {
    try {
        // чтобы вытащить динамический параметр из URL :id, используем req.params
        // получение поста по id. params - параметры запроса. id - идентификатор поста
        const postId = req.params.id;

        // findOneAndUpdate - нахождение поста в базе и обновление его
        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        );

        // если пост не найден 
        if (!doc) {
            return res.status(404).json({
                message: 'Пост не найден'
            });
        }

        // если пост найден, возвращаем пост
        res.json(doc);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось получить пост'
        });
    }
}

export const remove = async (req, res) => {
    try {
        // чтобы вытащить динамический параметр из URL :id, используем req.params
        // получение поста по id. params - параметры запроса. id - идентификатор поста
        const postId = req.params.id;

        // findOneAndDelete - нахождение и удаление поста в базе
        const doc = await PostModel.findOneAndDelete({ _id: postId });

        // если пост не найден
        if (!doc) {
            return res.status(404).json({
                message: 'Пост не удалось найти'
            });
        }

        // если пост найден и удален, возвращаем успех
        res.json({
            success: true
        });

    } catch (error) {
        // обработка ошибок при выполнении запроса
        console.log(error);
        res.status(500).json({
            message: 'Не удалось удалить пост'
        });
    }
}



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