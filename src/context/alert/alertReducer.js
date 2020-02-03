import {HIDE_ALERT, SHOW_ALERT} from '../types'

const handlers = {
    [SHOW_ALERT]: (state, action) => action.payload,
    [HIDE_ALERT]: () => null,
    DEFAULT: state => state
}

export const alertReducer = (state, action) => {
    // Reducer - функции, которые просто проверяют action.type и возвращают обновленный state

    const handler = handlers[action.type] || handlers.DEFAULT // если ничего не будет найдено
    return handler(state, action)
}