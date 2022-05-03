import React ,{useState, useEffect} from "react";
import Sticker from "../Sticker/Sticker";
import { deleteNote,getAllNote } from "../../service/notes";
import { useAuthState } from "../../context";
import "./style.scss";

const Stickerlist = () => {
  const { username,token } = useAuthState();
  const [dataList,setDataList]=useState([])
  console.log("username",username)
  useEffect(()=>{
    if(username){
      getAllNote(token).then((res)=>{
        console.log(res)
        setDataList(res?.data)
      }).catch(err=>{
        console.log(err.response.data.message)
      })
    }
  },[username,token])
  const handleDelete = async(id) => {
    console.log(`delete note id ${id}`)
    try{
      const response =await deleteNote(id,token)
      setDataList(dataList.filter(note=>note._id !== response.data.id))
      console.log(response)
    }catch(error){
      console.log(error)
    }
  };
  return (
    <div className="sticker-list">
      {
        dataList.map(note=>(
          <Sticker key={note._id} note={note} handleDelete={handleDelete}/>
        ))
      }
      <div className="add-note">
          
      </div>
    </div>
  );
};

export default Stickerlist;
