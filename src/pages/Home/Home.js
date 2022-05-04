import React, { useState } from "react";
import { IconButton, Button, TextField } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import StickerList from "../../components/StickerList/StickerList";
import { useAuthDispatch, useAuthState, logout } from "../../context";
import "./style.scss";

const Home = () => {
  const [isDark, setDark] = useState(false);
  const { username } = useAuthState();
  const dispatch = useAuthDispatch();
  const handleTheme = () => {
    setDark(!isDark);
  };
  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <div className="page">
      <div className="header">
        <div className="top-bar">
          <div className="title">
            <span className="logo">📋</span>
            <span className="titlename">Stickers</span>
          </div>
          <ul className="btn-area">
            <li className="change-theme">
              <IconButton onClick={handleTheme}>
                {isDark ? <Brightness4Icon /> : <WbSunnyIcon />}
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
          <TextField id="standard-basic" label="search" />
        </div>
      </div>
      <div className="sticker-list-area">
        <StickerList />
      </div>
    </div>
  );
};

export default Home;
