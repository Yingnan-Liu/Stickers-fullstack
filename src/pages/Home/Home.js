import React, { useState,useEffect,useContext } from "react";
import { IconButton, Button, TextField,Snackbar } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import StickerList from "../../components/StickerList/StickerList";
import { useAuthDispatch, useAuthState, logout } from "../../context";
import { ThemeContext } from "../../App";
import "./style.scss";

const Home = () => {
  const { username,errorMessage } = useAuthState();
  const [open,setOpen]=useState(false)
  const dispatch = useAuthDispatch();
  const {theme,toggleTheme} = useContext(ThemeContext)
  const body=document.body

  const handleTheme=()=>{
    toggleTheme()
  }
  useEffect(()=>{
    console.log("theme",theme)
    if(theme=="light"){
      body.classList.remove("dark")
    }else{
      body.classList.add("dark")
    }
  },[theme])

  
  const handleLogout = () => {
    logout(dispatch);
  };

  useEffect(()=>{
    if(errorMessage) {
      setOpen(true)
    } 
  },[errorMessage])

  // useEffect(()=>{
  //   dispatch({type:"DARK-MODE",darkmode:isDark})
  // },[isDark])

  const handleClose=()=>{
    setOpen(false)
    dispatch({type:"MESSAGE",error:null})
  }
  return (
    <div className="page">
      <div className={theme==="dark" ? "header-dark":"header"}>
        <div className="top-bar">
          <div className="title">
            <span className="logo">📋</span>
            <span className="titlename">Stickers</span>
          </div>
          <ul className="btn-area">
            <li className="change-theme">
              <IconButton onClick={handleTheme}>
                {theme==="dark" ? <Brightness4Icon /> : <WbSunnyIcon />}
              </IconButton>
            </li>
            {username === "" ? (
              <>
                <li className="login">
                  <Button component={RouterLink} to="/signin">
                    登 录
                  </Button>
                </li>
                <li className="register">
                  <Button component={RouterLink} to="/signup">
                    注 册
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="username">👋 Hi {username}</li>
                <li className="logout" onClick={handleLogout}>
                  <Button>退 出</Button>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="search-area">
          <TextField id="search-input" fullwidth label="search"  />
        </div>
      </div>
      <div className="sticker-list-area">
        <StickerList />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}       
        message={errorMessage}
        action={
          <IconButton  onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
};

export default Home;
