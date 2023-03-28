import React, { useEffect, useState } from "react";
import date from "date-and-time";

function Time() {
  const now = new Date();
  //    date.format(now, "HH:mm:ss ddd, MMM DD YYYY")
  const [time, setTime] = useState(date.format(now, "hh:mm A"));
  const getTime = async () => {
    setInterval(() => {
      const now = new Date();
      setTime(date.format(now, "hh:mm A"));
    }, 60000);
  };

  useEffect(() => {
    getTime();
  }, []);

  return time;
}

export default Time;
