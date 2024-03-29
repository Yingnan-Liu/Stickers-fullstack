import React, { useState, useEffect,useContext } from "react";
import { IconButton, Chip, Typography, TextField ,Snackbar} from "@material-ui/core";
import dayjs from "dayjs";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { useAuthState,useAuthDispatch } from "../../context";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { updateNote } from "../../service/notes";
import { ThemeContext } from "../../App";
import "./style.scss";

const Sticker = ({ note, handleDelete }) => {
  const { token,errorMessage } = useAuthState();
  // const [debouncedText, setDebounceText] = useDebounce("",200);
  const dispatch = useAuthDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [open,setOpen]=useState(false)
  const [inputText,setInputText] =useState(note.text || "")
  const {theme} = useContext(ThemeContext)

  //note信息 id,time,text
  const [noteInfo, setNoteInfo] = useState({
    id: note._id || "",
    text: note.text || "",
    updatedAt:
      dayjs(note.updatedAt).format("YYYY/MM/DD") ||
      dayjs().format("YYYY/MM/DD"),
  });
  const handleTextInput = (e) => {
    // setNoteInfo({
    //   ...noteInfo,
    //   text: e.target.value,
    // });
    setInputText(e.target.value)
  };

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = async () => {
    setIsEdit(false);
  };

  const handleNoteDelete = () => {
    handleDelete(noteInfo.id);
  };

  useEffect(() => {
    const clickSave = async () => {
      try {
        console.log("发送save请求");
        const response = await updateNote(noteInfo.id, inputText, token);
        const { _id, text, updatedAt } = response.data;
        setNoteInfo({
          id: _id,
          text,
          updatedAt: dayjs(updatedAt).format("YYYY/MM/DD"),
        });
      } catch (error) {
        console.log(error.response.data.message);
        dispatch({type:"MESSAGE",error:error.response.data.message})
        setOpen(true)
      }
    };
    if (isEdit === false && noteInfo.text!==inputText) {
      clickSave();
    }
  }, [noteInfo.text, isEdit]);

  return (
    <div className="sticker">
      <Snackbar
        open={open}
        autoHideDuration={6000}       
        message={errorMessage}
        action={
          <IconButton  onClick={()=>setOpen(false)}>
            <CloseIcon />
          </IconButton>
        }
      />
      <div className={theme==="dark"?"paper-dark":"paper"} >
        <div className="paper-header">
          <IconButton aria-label="delete" onClick={handleNoteDelete}>
            <CloseIcon />
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
              defaultValue={isEdit && noteInfo.text}
              onChange={handleTextInput}
              type="text"
            />
          ) : (
            <Typography className="text-typo">{noteInfo.text}</Typography>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sticker;
