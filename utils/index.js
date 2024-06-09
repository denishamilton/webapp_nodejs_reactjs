
/* ---------------------- */
// ПЕРВЫЙ СПОСОБ, ГДЕ МЫ СНАЧАЛА ИМПОРТИРУЕМ, А ПОТОМ ЭКСПОРТИРУЕМ

// // импортируем функцию для проверки авторизации
// import checkAuth from './checkAuth.js';

// // импортируем функцию для обработки ошибок
// import handleValitationsErrors from './handleValitationsErrors.js';

// export { checkAuth, handleValitationsErrors };
/* ---------------------- */



/* ---------------------- */
// ВТОРОЙ СПОСОБ, ГДЕ МЫ ОБЬЕДЕНЯЕМ ИМПОРТ И ЭКСПОРТ 

export { default as checkAuth } from './checkAuth.js';
export { default as handleValitationsErrors } from './handleValitationsErrors.js';
/* ---------------------- */