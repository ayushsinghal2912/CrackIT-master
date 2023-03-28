import React from "react";
import AceEditor from "react-ace";

import "./Output.css";

function Output({ outputValue, setOutputValue, fontSiz }) {
  return (
    <div className="output_container">
      <p className="inputHeading">Output</p>
      <AceEditor
        mode="text"
        theme="monokai"
        name="output"
        editorProps={{ $blockScrolling: true }}
        fontSize={fontSiz}
        value={outputValue}
        onChange={(e) => setOutputValue(e)}
        wrapEnabled={true}
        placeholder="Press cmd + ' or ctrl + ' to run"
      />
    </div>
  );
}

export default Output;
