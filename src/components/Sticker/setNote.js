
import {saveNote,updateNote} from "../../service/notes"

export const setNote = async(curr_id,curr_text,token)=>{
    let response={}
    if(curr_id===""){
        response=await saveNote({'text':curr_text},token)
        console.log("save response:",response.data)
    }else{
        console.log("put 请求")
        response=await updateNote(curr_id,{'text':curr_text},token)
        console.log("put response:",response.data)

    }
    let {_id:id,text,updatedAt} = response.data
    return {id,text,updatedAt}
}