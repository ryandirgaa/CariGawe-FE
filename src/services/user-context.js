import React, { createContext, useState } from 'react'

export const UserContext = createContext();
export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();
    const [token, setToken] = useState();
    const getFromLocalStorage = () => {
        setCurrentUser(localStorage.getItem('user'))
        setToken(localStorage.getItem('token').toString())
    }

    const data = {
        currentUser,
        setCurrentUser,
        token,
        setToken,
        getFromLocalStorage
    }

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    )
}