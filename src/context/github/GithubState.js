import React, {useReducer} from 'react'
import axios from 'axios'
import { GithubContext } from './githubContext'
import {githubReducer} from './githubReducer'
import {SEARCH_USERS, GET_USER, GET_REPOS, CLEAR_USERS, SET_LOADING} from '../types'

// эти переменные будем добавлять для get-запросов, которые будем делать
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

// метод автоматически добавляет данные для url
const withCreds = url => {
    return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

export const GithubState = ({children}) => {
    const initialState = {
        user: {},
        users: [],
        loading: false,
        repos: []
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // функции, которые меняют состояние самого state (dispatch)
    // метод, который позволяет искать пользователя
    const search = async value => { // нужен запрос на сервер
        setLoading()

        // запрос на сервер
        const response = await axios.get(
            withCreds(`https://api.github.com/search/users?q=${value}&`)
        )

        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items // в массиве хранятся те данные, которые пришли от github
        })
    }

    // метод позволяет искать определенного пользователя
    const getUser = async name => {
        setLoading()

        // запрос на сервер. получаем объект, ждем, пока выполнится метод get, куда передаем url
        const response = await axios.get(
            withCreds(`https://api.github.com/users/${name}?`)
        )

        dispatch({
            type: GET_USER,
            payload: response.data
        })
    }

    // метод позволяет получать список репозиториев
    const getRepos = async name => {
        setLoading()

        // запрос на сервер
        const response = await axios.get(
            withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`)
        )

        dispatch({
            type: GET_REPOS,
            payload: response.data
        })
    }

    // метод позволяет чистить список пользователей
    const clearUsers = () => dispatch({
        type: CLEAR_USERS
    })

    // метод позволяет менять состояние loading, чтобы loading появился
    const setLoading = () => dispatch({
        type: SET_LOADING
    })

    const {user, users, repos, loading} = state

    return (
        // любые дочерние элементы имеют доступ до функции, которую мы будем экспортировать в Provider.value
        <GithubContext.Provider value={{
            // теперь любые компоненты, которые будет подключать в себя контекст gitHub, они будут иметь доступ до этих методов, с помощью которых мы будем отправдять различные запросы
            setLoading,
            search,
            getUser,
            getRepos,
            clearUsers,
            user, users, repos, loading
        }}>
            {children}
        </GithubContext.Provider>
    )
}