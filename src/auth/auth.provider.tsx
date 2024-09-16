import { createContext, useContext, useState } from "react";
import { UserPayload } from "../common/interfaces/user.interface";

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext({
    isAuthenticated: false,
    isPremium: false,
    getUser: () => ({} as UserPayload || undefined),
    signOut: () => {},
    saveSessionInfo: (user: UserPayload, token: string, isPremium: boolean) => {},
    getToken: () => {}
})

export const AuthProvider = ({children}: AuthProviderProps ) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ isPremium, setIsPremium ] = useState(false)
    const [ accesToken, SetAccesToken ] = useState<string>(' ')
    const [ user, setUser ] = useState<UserPayload>()

    function getUser(){
        return user as UserPayload
    }

    function signOut(){
        setIsAuthenticated(false)
        SetAccesToken(' ')
        setUser(undefined)
        localStorage.removeItem('session')
    }

    function saveSessionInfo(userInfo: UserPayload, token: string, isPremium: boolean){
        SetAccesToken(token)
        localStorage.setItem('session', token)
        setIsPremium(isPremium)
        setIsAuthenticated(true)
        setUser(userInfo)
    }

    function getToken(){
        return accesToken
    }

    return(
        <AuthContext.Provider value={{ isPremium ,isAuthenticated, signOut, getUser, saveSessionInfo, getToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)