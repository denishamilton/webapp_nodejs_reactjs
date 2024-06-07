import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    // получаем токен из заголовка Authorization и удаляем из него "Bearer "
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    // проверяем токен на валидность
    if (token) {
        try {
            // расшифровываем токен с помощью секретного ключа
            const decoded = jwt.verify(token, 'secret123');
            // записываем id пользователя в объект запроса req, для дальнейшего использования в дальнейшем коде
            req.userId = decoded._id;
            // next - выполняем следующую функцию
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Нет доступа' });
        }
    } else {
        return res.status(403).json({ message: 'Нет доступа' });
    }
}