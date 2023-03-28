import React, { useEffect, useState } from "react";
import style from "./NavBar.module.css";
import logo from "../assets/pngwing.com.png";
import date from "date-and-time";

function NavBar() {
  //   const now = new Date();
  const now = new Date();
  //    date.format(now, "HH:mm:ss ddd, MMM DD YYYY")
  const [Time, setTime] = useState(date.format(now, "HH:mm ddd, MMM DD"));
  const getTime = async () => {
    setInterval(() => {
      const now = new Date();
      setTime(date.format(now, "HH:mm ddd, MMM DD"));
    }, 60000);
  };

  useEffect(() => {
    getTime();
  }, []);

  //   useEffect(() => {
  //     settime(Time.current);
  //   }, [Time]);

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <img src={logo} alt="logo" className={style.logo} />
        <span className={style.title}>CrackIT</span>
      </div>

      <div className={style.timeContainer}>
        <span className={style.time}>{Time}</span>
      </div>
    </div>
  );
}

export default NavBar;
