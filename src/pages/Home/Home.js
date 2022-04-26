import React, { useState } from "react";
import { IconButton, Button, TextField } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import StickerList from "../../components/StickerList/StickerList";
import "./style.scss";

const Home = () => {
  const [isDark, setDark] = useState(false);
  const handleTheme = () => {
    setDark(!isDark);
  };
  return (
    <div className="page">
      <div className="header">
        <div className="top-bar">
          <div className="title">
            <h4 className="logo">📋 </h4>
            <h4 className="titlename">Stickers</h4>
          </div>
          <ul className="btn-area">
            <li className="change-theme">
              <IconButton onClick={handleTheme}>
                {isDark ? <Brightness4Icon /> : <WbSunnyIcon />}
              </IconButton>
            </li>
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
