import React, { useState, useEffect } from "react";
import { IconButton, Chip, Typography, TextField } from "@material-ui/core";
import dayjs from "dayjs";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { useAuthState } from "../../context";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
// import { useDebounce } from "../../utils/useDebounce";
import { setNote } from "./setNote";


import "./style.scss";

const Sticker = ({ note,handleDelete }) => {
  const { token } = useAuthState();
  // const [debouncedText, setDebounceText] = useDebounce("",200);

  const [isEdit, setIsEdit] = useState(false);
  //note信息 id,time,text
  const [noteInfo,setNoteInfo] = useState({
    id:note._id||"",
    text:note.text||"",
    updatedAt:dayjs(note.updatedAt).format("YYYY/MM/DD")||dayjs().format("YYYY/MM/DD")
  })
  // const [id, setId] = useState("");
  // const [text, setText] = useState("");
  // const [updatedAt, setUpdatedAt] = useState(dayjs().format("YYYY/MM/DD"));

  const handleTextInput = (e) => {
    setNoteInfo({
      ...noteInfo,
      text:e.target.value
    });
  };

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = async () => {
    setIsEdit(false);
    //发送保存请求
    try {
      const { id, text, updatedAt } = await setNote(noteInfo.id, noteInfo.text,token);
      setNoteInfo({
        id,text,
        "updatedAt":dayjs(updatedAt).format("YYYY/MM/DD")
      })
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleNoteDelete=()=>{
    handleDelete(noteInfo.id)
  }

  return (
    <div className="sticker">
      {/* {/* <div>{text}</div> */}
      {/* <div>{noteInfo.id}</div> */}
      <div className="paper">
        <div className="paper-header">
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>

        <div className="paper-content">
          {isEdit ? (
            <TextField
              variant="outlined"
              className="text-area"
              minRows={7}
              maxRows={7}
              label="请输入文本"
              multiline
              onChange={handleTextInput}
            />
          ) : (
            <Typography>{noteInfo.text}</Typography>
          )}
        </div>
        <div className="paper-footer">
          <Chip className="time-staple" label={noteInfo.updatedAt} />
          <div className="paper-btns">
            {isEdit ? (
              <IconButton aria-label="save" onClick={handleSave}>
                <AssignmentTurnedInIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="edit" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            )}

            <IconButton aria-label="delete" onClick={handleNoteDelete} >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sticker;
