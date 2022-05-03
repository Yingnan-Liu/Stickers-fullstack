import { baseUrl } from "./config";
import {setToken} from "./config"
import axios from "axios";

//axios发Auth
const userApi=`${baseUrl}/api/notes`

//保存note
export const saveNote=(data,token)=>{
    let bearerToken = setToken(token)
    console.log("token here:::",bearerToken)
    return axios.post(userApi,data,{
        headers:{
            "Authorization":bearerToken+""
        }
    })
}

export const updateNote=(id,data,token)=>{
    let bearerToken = setToken(token)
    console.log("token here:::",bearerToken)
    return axios({
        method:"PUT",
        url:userApi+"/"+id,
        data,
        headers:{
            "Authorization":bearerToken+""
        }
    })
}