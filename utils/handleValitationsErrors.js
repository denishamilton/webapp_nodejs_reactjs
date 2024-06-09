import { validationResult } from 'express-validator'; // загружаем validationResult - функцию для проверки валидности данных из библиотеки express-validator 

export default (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    next();
}