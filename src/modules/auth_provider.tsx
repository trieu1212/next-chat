"use client"
import { UserInterface } from '@/types/user'
import React, { createContext, ReactNode, useEffect } from 'react'

export const AuthContext = createContext<
    {
        authenticated: boolean
        setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
        user: UserInterface
        setUser: React.Dispatch<React.SetStateAction<UserInterface>>
    }
>({
    authenticated: false,
    setAuthenticated: () => {},
    user: {
        id: 0,
        email: '',
        name: ''
    },
    setUser : () => {}
})  

const AuthContextProvider = ({children}:{children:ReactNode}) => {
    const [authenticated, setAuthenticated] = React.useState(false)
    const [user, setUser] = React.useState<UserInterface>({
        id: 0,
        email: '',
        name: ''
    })

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user')
            if (!user) {
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login'
                    return
                }
            } else {
                setUser(JSON.parse(user))
                setAuthenticated(true)
            }
        }
    }, [authenticated])

    return (
        <AuthContext.Provider value={{authenticated, setAuthenticated, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
