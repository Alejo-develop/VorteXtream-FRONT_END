import { createContext, useContext, useState } from "react";
import { UserPayload } from "../common/interfaces/user.interface";

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext({
    isAuthenticated: false,
    getUser: () => ({} as UserPayload || undefined),
    signOut: () => {},
    saveSessionInfo: (user: UserPayload, token: string) => {},
    getToken: () => {}
})

export const AuthProvider = ({children}: AuthProviderProps ) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ accesToken, SetAccesToken ] = useState<string>(' ')
    const [ user, setUser ] = useState<UserPayload>()

    function getUser(){
        return user as UserPayload
    }

    function signOut(){
        setIsAuthenticated(false)
        SetAccesToken(' ')
        setUser(undefined)
        sessionStorage.removeItem('session')
    }

    function saveSessionInfo(userInfo: UserPayload, token: string){
        SetAccesToken(token)
        localStorage.setItem('session', token)
        setIsAuthenticated(true)
        console.log(userInfo);
        
        setUser(userInfo)
    }

    

    function getToken(){
        return accesToken
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, signOut, getUser, saveSessionInfo, getToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)