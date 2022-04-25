import React from "react";
import { Switch, Button, TextField } from "@material-ui/core";
import StickerList from "../../components/StickerList/StickerList";
import "./style.scss";

const Home = () => {
  return (
    <div className="page">
      <div className="header">
        <div className="top-bar">
          <div className="title">
            <h4 className="logo">📋 </h4>
            <h4 className="titlename">Stickers</h4>
          </div>
          <ul className="btn-area">
            <li className="theme">
              <span>🌗</span>
              <Switch defaultChecked color="default" />
            </li>
            <li className="login">
              <Button>登 录</Button>
            </li>
            <li className="register">
              <Button>注 册</Button>
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
