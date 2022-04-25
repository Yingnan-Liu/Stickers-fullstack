import React from "react";
import Sticker from "../Sticker/Sticker";
import "./style.scss";

const Stickerlist = () => {
  return (
    <div className="sticker-list">
      <Sticker />
      <Sticker />
      <Sticker />
      <Sticker />
    </div>
  );
};

export default Stickerlist;