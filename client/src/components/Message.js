import React from "react";
import style from "./Message.module.css";

function Message(props) {
  return (
    <div className={`${style.container}  ${props.isMy && style.shiftRight}`}>
      <div className={style.messageTime}>
        <p>{props.time}</p>
      </div>
      <div className={`${style.message}`}>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default Message;
