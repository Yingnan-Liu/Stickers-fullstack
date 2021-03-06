import React, { useState, useEffect,useContext } from "react";
import Sticker from "../Sticker/Sticker";
import {Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { deleteNote, getAllNote, saveNote,searchNote } from "../../service/notes";
import { useAuthState,useAuthDispatch } from "../../context";
import AddNoteDialog from "../AddNoteDialog.js/AddNoteDialog";
import "./style.scss";

const Stickerlist = ({search}) => {
  const { username, token } = useAuthState();
  const [dataList, setDataList] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useAuthDispatch();
  useEffect(() => {
    if (username ) {
      getAllNote(token)
        .then((res) => {
          console.log(res);
          setDataList(res?.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          dispatch({type:"MESSAGE",error:err.response.data.message})
        });
    }
  }, [username]);
  useEffect(()=>{
    // let searchResult
    console.log("search in list:",search)

    search&&searchNote(search,token).then((res)=>{
      console.log("res",res)
      setDataList(res.data)
  })
  },[search])
  const handleDelete = async (id) => {
    console.log(`delete note id ${id}`);
    try {
      const response = await deleteNote(id, token);
      setDataList(dataList.filter((note) => note._id !== response.data.id));
      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch({type:"MESSAGE",error:error.response.data.message})
    }
  };
  const handleAddBtn = () => {
    setOpen(true);
  };
  const handleAddNote = async (curr_text) => {
    try{
      const response = await saveNote({ text: curr_text }, token);
    console.log("save note返回:", response.data);
    setDataList([
      ...dataList,
      {
        ...response.data,
      },
    ]);
    }catch(error){
      dispatch({type:"MESSAGE",error:error.response.data.message})
    }
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div >
        <AddNoteDialog
          
          open={open}
          handleClose={handleClose}
          handleAddNote={handleAddNote}
        />
      </div>
      <div className="add-note-btn">
        <Fab color="primary" aria-label="add" onClick={handleAddBtn}>
          <AddIcon />
        </Fab>
      </div>

      {username ? (
        <div className="sticker-list">
          {dataList.map((note) => (
            <Sticker key={note._id} note={note} handleDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <span style={{ fontSize: "1.5rem", marginTop: "4rem" }}>
          🔮 登录试试吧
        </span>
      )}
    </React.Fragment>
  );
};

export default Stickerlist;
