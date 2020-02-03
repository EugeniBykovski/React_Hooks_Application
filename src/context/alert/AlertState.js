import React, {useReducer} from 'react'
import { AlertContext } from './alertContext'
import { alertReducer } from './alertReducer'
import {HIDE_ALERT, SHOW_ALERT} from '../types'

// * Хук - это обычная функция, которую мы можем вызывать

export const AlertState = ({children}) => {
    // dispatch - позволяет менять данный state
    const [state, dispatch] = useReducer(alertReducer, null) // передаем в параметрах reducer и начальное значение (по умолчанию нам alert показывать не нужно)

    // функция, которая будет диспатчить объект, у которого будет тип
    const hide = () => dispatch({type: HIDE_ALERT})

    // функция, которая показываем сам alert
    const show = (text, type = 'secondary') => {
        dispatch({
            type: SHOW_ALERT,
            payload: {type, text} // ключ будет состоять из типа и текста
        })
    }

    return (
        <AlertContext.Provider value={{
            hide, show, alert: state // получаемые поля
        }}>
            {children}
        </AlertContext.Provider>
    )
}