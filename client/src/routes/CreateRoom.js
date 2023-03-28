import React, { useEffect, useRef, useState } from "react";
// import { v1 as uuid } from "uuid";
import NavBar from "../components/NavBar";
import style from "./CreateRoom.module.css";
import videoCall from "../assets/outline_video_call_white_24dp.png";
// import CarousalLeft from "../components/CarousalLeft";
import { Bounce, LightSpeed, Zoom } from "react-reveal";
import RubberBand from "react-reveal/RubberBand";
import axois from "axios";
import linkIcon from "../assets/link.png";
import { customAlphabet } from "nanoid";
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";

const CreateRoom = (props) => {
  const [link, setLink] = useState();
  const [copyStatus, setCopyStatus] = useState("Copy");
  const linkRef = useRef();
  const history = useHistory();
  useEffect(() => {
    const id = customAlphabet("1234567890abcdef", 10)();
    const long_url = `${window.location.href}room/${id}`;
    // const long_url = `/room/${id}`;
    axois
      .post(
        "https://api-ssl.bitly.com/v4/shorten",
        {
          domain: "bit.ly",
          long_url,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_BITLY_KEY}`,
          },
        }
      )
      .then((res) => {
        //   console.log(res.data.link);
        //   setLink(res.data.link);
        //   setBtnMessage("Start Interview");
        linkRef.current = res.data.link;
        // props.setMeetingLink(res.data.link);
      })
      .catch((err) => {
        console.log(err.response);
        //   setLink(long_url);
        //   setBtnMessage("Start Interview");
        linkRef.current = long_url;
        // props.setMeetingLink(long_url);
      });
  }, []);

  const [btnMessage, setBtnMessage] = useState("Create Room");

  function create() {
    if (link) {
      window.location.href = link;
      // history.push(link);
    } else {
      // const id = customAlphabet("1234567890abcdef", 10)();

      //   fetch("https://api-ssl.bitly.com/v4/shorten", {
      //     method: "POST",
      //     headers: {
      //       Authorization: "Bearer 15cfb8770c0abd7eba19a9b134eb8deb806dddc5",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       domain: "bit.ly",
      //       long_url:
      //         "https://stackoverflow.com/questions/51437726/bit-ly-bitlink-creation-always-return-forbidden-even-after-email-verification",
      //     }),
      //   })
      //     .then((res) => console.log(res))
      //     .catch((err) => console.log("errrr->", err));
      //   const long_url = `${window.location.href}room/${id}`;
      //   axois
      //     .post(
      //       "https://api-ssl.bitly.com/v4/shorten",
      //       {
      //         domain: "bit.ly",
      //         long_url,
      //       },
      //       {
      //         headers: {
      //           //   Authorization: `Bearer ${process.env.REACT_APP_BITLY_KEY}`,
      //         },
      //       }
      //     )
      //     .then((res) => {
      //       console.log(res.data.link);
      setLink(linkRef.current);
      setBtnMessage("Start Interview");
      //     })
      //     .catch((err) => {
      //       console.log(err.response);
      //       setLink(long_url);
      //       setBtnMessage("Start Interview");
      //     });
      //   setLink(long_url);
    }
  }

  const handleCopy = () => {
    setCopyStatus("Copied");
    navigator.clipboard.writeText(link);
    setTimeout(async () => setCopyStatus("Copy"), 1000);
  };

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.subContainer}>
        <div className={style.createContainer}>
          <div className={style.headingContainer}>
            <p className={style.heading}>
              <Zoom left cascade>
                Premium video meetings.
              </Zoom>
            </p>
            <p className={style.heading}>
              <Zoom right cascade>
                With Inbuit IDE.
              </Zoom>
            </p>
          </div>
          <Bounce left delay={1000}>
            <p className={style.subHeading}>A perfect solution for remote one-on-one interviews. </p>
          </Bounce>
          <RubberBand delay={1500}>
            <button onClick={create} className={style.createBtn}>
              <img src={videoCall} alt="Create Room" className={style.videoIcon} />
              {btnMessage}
            </button>
          </RubberBand>
          {
            <div>
              <div className={style.link}>
                <LightSpeed left when={link !== undefined}>
                  <img src={linkIcon} alt="" className={style.linkIcon} />
                </LightSpeed>
                <LightSpeed right when={link !== undefined}>
                  <span onClick={handleCopy} data-tip data-for="React-tooltip">
                    {link}
                  </span>
                  <ReactTooltip id="React-tooltip" place="top" type="dark" effect="solid" backgroundColor="#36393a">
                    {copyStatus}
                  </ReactTooltip>
                </LightSpeed>
              </div>
              <p className={style.info}>
                <Bounce bottom cascade when={link !== undefined} duration={800}>
                  Share the link to add user to call
                </Bounce>
              </p>
            </div>
          }
        </div>
        <div className={style.sliderContainer}>{/* <CarousalLeft /> */}</div>
      </div>
    </div>
  );
};

export default CreateRoom;
