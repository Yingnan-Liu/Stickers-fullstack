import React,{useState,useContext} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import "./styles.scss"
import { ThemeContext } from "../../App";

export default function AddNoteDialog({ open, handleClose ,handleAddNote}) {
    const [text,setText]=useState("")
    const { theme } = useContext(ThemeContext);
    const handleSaveNote=()=>{
        handleAddNote(text)
        setText("")
    }
  return (
    <div  >
      <Dialog 
      className={theme==='dark'&&"darkDialog"}
      maxWidth="xs" 
      fullWidth
      open={open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      >
        <DialogTitle>请在这里输入文本&#128221; </DialogTitle>
        <DialogContent>
          <TextField
          variant="outlined"
           autoFocus
            margin="dense"
            id="text"
            // label="text"
            fullWidth
            multiline
            minRows={7}
            maxRows={7}
            onChange={(e)=>setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handleSaveNote} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
