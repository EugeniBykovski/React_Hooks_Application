import React, {useContext} from 'react'
import {AlertContext} from '../context/alert/alertContext'

export const Alert = () => {
    const {alert, hide} = useContext(AlertContext) // получаем доступ до объекта

    // проверка. Если не alert
    if (!alert) {
        return null // то возвращаем null
    }

    return ( // иначе рендерим весь шаблон
        <div
            className={`alert alert-${alert.type || 'secondary'} alert-dismissible`}
            role="alert"
        >
            {alert.text}
            <button type="button" className="close" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}