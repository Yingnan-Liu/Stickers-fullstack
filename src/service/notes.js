// import { baseUrl } from "./config";
import {setToken} from "./config"
import axios from "axios";

//axios发Auth
// const userApi=`${baseUrl}/api/notes`
const baseUrl="/api/notes"

//将text中的\n换为《br/》

//保存note
export const saveNote=(data,token)=>{
    let bearerToken = setToken(token)
    // let {text}=data
    // let newText=text.replace('/\n/g','<br/>')
    // data.text=newText
    console.log("token here:::",bearerToken)
    console.log("newData",data)
    return axios.post(baseUrl,data,{
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
        url:baseUrl+"/"+id,
        data:{text:data},
        headers:{
            "Authorization":bearerToken+""
        }
    })
}
//请求所有的note
export const getAllNote=(token)=>{
    let bearerToken = setToken(token)
    return axios.get(baseUrl,{
        headers:{
            "Authorization":bearerToken+""
        }
    })
}
//删除note
export const deleteNote=(id,token)=>{
    let bearerToken = setToken(token)
    return axios.delete(baseUrl+"/"+id,{
        headers:{
            "Authorization":bearerToken+""
        }
    })
}

export const searchNote=(text,token)=>{
    let bearerToken = setToken(token)
    return axios.post(baseUrl+"/search",{},{
        headers:{
            "Authorization":bearerToken+""
        },
        params:{
            text
        }
    })
}