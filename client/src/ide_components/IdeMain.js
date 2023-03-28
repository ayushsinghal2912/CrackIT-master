import "./IdeMain.css";
import React, { useRef, useState } from "react";
// import "ace-builds/src-noconflict/mode";
import axios from "axios";
import Editor from "./Editor";
// import "ace-builds/webpack-resolver";
import Output from "./Output";
import Input from "./Input";
import arrow from "./assets/next.png";
import $ from "jquery";

function IdeMain() {
  const [code, setCode] = useState();
  const [output, setOutput] = useState();
  const [input, setInput] = useState();
  const [language, setLanguage] = useState();
  const [textMode, setTextMode] = useState("c_cpp");
  const [toggle, setToggle] = useState(false);
  const [activeDrop, setActiveDrop] = useState("C++");
  const [fontSize, setFontSize] = useState(16);
  const running = useRef();
  running.current = false;

  const dict = {
    "C++": "cpp",
    PYTHON: "py",
    JAVA: "java",
  };
  const handleSubmit = async (e) => {
    if (code === undefined) return alert("Empty code\n");
    // console.log($(".submit_btn"));
    console.log(!running.current);
    if (e.type === "click" || (e.key === `'` && (e.metaKey || e.ctrlKey) && !running.current)) {
      running.current = true;
      console.log("pppppp");
      $(".submit_btn").html("Running");
      $(".submit_btn").prop("disabled", true);

      const data = {
        language,
        code,
        input,
      };
      // console.log("Input-->", input);
      try {
        // console.log("process.env.IDE_BACKEND_LINK-->",`${process.env.REACT_APP_IDE_BACKEND_LINK}`);
        const output = await axios.post("https://ide-backend.onrender.com/run", data);
        console.log(output.data.output);
        setOutput(output.data.output);
      } catch (err) {
        setOutput(err?.response?.data?.stderr);
        console.log(err?.response?.data?.stderr);
      }
      $(".submit_btn").prop("disabled", false);
      $(".submit_btn").html("Run");
      running.current = !true;
    }
  };

  // const handleSelect = (e) => {
  //   setLanguage(e.target.value);
  //   // console.log(e.target.value);
  //   // console.log("cpp");
  //   if (e.target.value === "cpp") setTextMode("c_cpp");
  //   if (e.target.value === "py") setTextMode("python");
  //   if (e.target.value === "java") {
  //     setTextMode("java");
  //     //alert("Write the class name as Main!!!");
  //   }
  //   // console.log(textMode);
  // };

  const handleoptions = (e) => {
    // console.log(e.target.innerHTML);
    setActiveDrop(e.target.innerHTML);
    setLanguage(dict[e.target.innerHTML]);
    // console.log(e.target.innerHTML);
    // console.log("cpp");
    if (e.target.innerHTML === "C++") setTextMode("c_cpp");
    if (e.target.innerHTML === "PYTHON") setTextMode("python");
    if (e.target.innerHTML === "JAVA") setTextMode("java");
    //alert("Write the class name as Main!!!");
  };

  const handleFontSize = (e) => {
    setFontSize(Number(e.target.value));
    console.log(Number(e.target.value));
  };

  return (
    <div className="AppIde" onKeyDownCapture={handleSubmit}>
      <div className="navbar">
        <div className="button_container">
          <button className="submit_btn" onClick={handleSubmit}>
            Run
          </button>
          {/* <select
            className="select_btn"
            onChange={handleSelect}
            defaultValue="cpp"
          >
            <option value="cpp">C++</option>
            <option value="py">Python3</option>
            <option value="java">JAVA</option>
          </select> */}

          <div tabIndex="1" className="dropdownMenu" onClick={() => setToggle(!toggle)} onBlur={() => setToggle(false)}>
            <span>{activeDrop}</span>
            <img className={`arrow ${toggle && "upArrow"}`} src={arrow} alt="" />
            <div className={`dropOptions ${!toggle && "hide"}`}>
              <p onClick={handleoptions}>C++</p>
              <p onClick={handleoptions}>PYTHON</p>
              <p onClick={handleoptions}>JAVA</p>
            </div>
          </div>
          <div className="font_container">
            <label htmlFor="fontSize" className="fontLable">
              Size:
            </label>
            <input type="number" name="fontSize" className="fontSizeInput" defaultValue={16} onChange={handleFontSize} />
          </div>
        </div>
        <div className="heading">
          <span>IDE</span>
        </div>
      </div>

      <div className="container">
        <Editor code={code} setCode={setCode} textMode={textMode} fontSiz={fontSize} />
        <div className="io_container">
          <Output outputValue={output} setOutputValue={setOutput} fontSiz={fontSize} />
          <Input setInputValue={setInput} fontSiz={fontSize} />
        </div>
      </div>
    </div>
  );
}

export default IdeMain;
