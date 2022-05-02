import React, { useState, useCallback } from "react";
import { IconButton, Chip, Typography, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
// import { useAuthState } from "../../context";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { useDebounce } from "../../utils/useDebounce";
import "./style.scss";

const Sticker = ({ content }) => {
  const [disable, setDisable] = useState(true);
  const [text, setText] = useState("");
  const [debouncedText, setDebounceText] = useDebounce("");
  const [isEdit, setIsEdit] = useState(false);

  const handleTextInput = (e) => {
    setDebounceText(e.target.value);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = () => {
    setIsEdit(false);
    // save request
  };
  const handleDelete = () => {};

  const handleAdd = () => {};

  return (
    <div className="sticker">
      {/* <div>{text}</div>
    <div>{debouncedText}</div> */}
      <div className="paper">
        <div className="paper-header">
          <IconButton>
            <AddIcon onClick={handleAdd} />
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
              variant="outlined"
              multiline
              onChange={handleInput}
            />
          ) : (
            <Typography>{debouncedText}</Typography>
          )}
        </div>
        <div className="paper-footer">
          <Chip className="time-staple" label="2020/4/25" />
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

            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sticker;
