import { loginRequest } from "./externalServices.mjs"
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs"
import jwt_decode from "jwt-decode"

const baseURL = import.meta.env.VITE_SERVER_URL

export async function login(creds, redirect){
    if (!redirect) redirect = '/'
    try{
        const authToken = await loginRequest(creds)
        setLocalStorage('so-token', authToken)
        window.location = redirect
    } catch (err) {
        alertMessage(err)
    }
}

function isTokenValid(){
    const token = getLocalStorage('so-token')
    if (token){
        const decodedToken = jwt_decode(token)
        let currentDate = new Date()
        currentDate /= 1000
        if (decodedToken.exp < currentDate){
            console.log('Auth token is expired')
            return false
        }
        return true
    }
    return false
}

export default function checkLogin(){
    const token = getLocalStorage('so-token')
    if (!isTokenValid()) {
        localStorage.removeItem('so-token')
        const redirect = location.pathname
        window.location = `/login/index.html?redirect=${redirect}`
    }
    return token
}