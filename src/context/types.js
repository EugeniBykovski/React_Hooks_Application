// экспортируем константы, которые будут представлять типы для reducers
export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'

// создадим несколько констант, которые будут позволять изменять state для giHub
// позволяет очищать список всех пользователей на главной странице
export const CLEAR_USERS = 'CLEAR_USERS'
// позволяет получать список репозиториев для отдельного пользователя
export const GET_REPOS = 'GET_REPOS'
// получение самого пользователя
export const GET_USER = 'GET_USER'
// получать список пользователей
export const SEARCH_USERS = 'SEARCH_USERS'
// позволяет задавать лоадинг
export const SET_LOADING = 'SET_LOADING'