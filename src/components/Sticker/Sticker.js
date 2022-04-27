import React, { useState } from "react";
import { IconButton, Chip, Typography, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { useAuthState } from "../../context";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import "./style.scss";

const Sticker = ({ content }) => {
  const [disable, setDisable] = useState(true);
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = () => {
    setIsEdit(false);
  };
  return (
    <div className="sticker">
      <div className="paper">
        <div className="paper-header">
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>

        <div className="paper-content">
          {isEdit ? (
            <TextField
              className="text-area"
              minRows={7}
              maxRows={7}
              label="text"
              multiline
            />
          ) : (
            <Typography>{text}</Typography>
          )}
        </div>
        <div className="paper-footer">
          <Chip className="time-staple" label="2020/4/25" />
          <div className="paper-btns">
            <IconButton aria-label="edit">
              {isEdit ? (
                <AssignmentTurnedInIcon onClick={handleSave} />
              ) : (
                <EditIcon onClick={handleEdit} />
              )}
            </IconButton>
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
