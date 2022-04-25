import React, { useState } from "react";
import { Paper, TextArea, IconButton, Chip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import "./style.scss";

const Sticker = ({ content }) => {
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
        <div className="content-area">{text}</div>
        <div className="paper-btns">
          <Chip className="time-staple" label="2020/4/25" />
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
  );
};

export default Sticker;
