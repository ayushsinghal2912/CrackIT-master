import React from "react";
import AceEditor from "react-ace";
import "./Input.css";

function Input({ setInputValue, fontSiz }) {
  return (
    <div className="input_container">
      <p className="inputHeading">Input</p>
      <AceEditor
        mode="text"
        theme="monokai"
        name="input"
        editorProps={{ $blockScrolling: true }}
        fontSize={fontSiz}
        onChange={(e) => setInputValue(e)}
        placeholder="Enter Input"
      />
    </div>
  );
}

export default Input;
