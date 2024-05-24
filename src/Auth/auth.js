import {createContext,useContext,useState } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
    const [user,setuser] = useState(null)
    const [userName,setUserName] = useState(null)
    const [userId,setUserId] = useState(null)
    const [token,setToken] = useState(null)
    // const Navigate = useNavigate()
    
    const login = (UserData) =>{
        console.log(UserData)
        setUserName(UserData.username)
        setuser(UserData.role)
        setToken(UserData.token)
        setUserId(UserData.userId)
        Cookies.set('userId',UserData.userId, { expires: 1,secure: false })
        Cookies.set('userRole',UserData.role, { expires: 1,secure: false })
        Cookies.set('token',UserData.token, { expires: 1,secure: false })
        Cookies.set('userName',UserData.username, { expires: 1,secure: false })
    }

    const isAuthenticate = () =>{
        const userData = Cookies.get('userRole')
        const Token = Cookies.get('token')
        const username = Cookies.get('userName')
        const userid = Cookies.get('userId')
        // console.log()
        if(userData){
            setuser(userData)
            setToken(Token)
            setUserName(username)
            setUserId(userid)
        }
    }

    const logout = (user) =>{
        setuser(null)
        setToken(null)
        setUserName(null)
        Cookies.remove('userRole')
        Cookies.remove('token')
        Cookies.remove('userName')
        // Navigate('/')
    }

    return(
        <AuthContext.Provider value={{user,login,logout,isAuthenticate,token,userName,userId}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () =>{
    return useContext(AuthContext)
}