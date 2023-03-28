import React from "react";
import { useParams } from "react-router-dom";
import style from "./EndPage.module.css";

function EndPage() {
  const { roomID } = useParams();

  console.log(roomID);

  const handleRejoin = () => {
    window.location.href = `https://crackit-hps.herokuapp.com/room/${roomID}`;
  };

  const handleHome = () => {
    window.location.href = "https://crackit-hps.herokuapp.com/";
  };

  return (
    <div className={style.container}>
      <div className={style.subContainer}>
        <div className={style.heading}>
          <p>You left the meeting</p>
        </div>
        <div className={style.btnContainer}>
          <button className={style.btnRejoin} onClick={handleRejoin}>
            Rejoin
          </button>
          <button className={style.btnHomePage} onClick={handleHome}>
            Redirect to homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndPage;
