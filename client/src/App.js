import React, { useState } from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import "./App.css";
import EndPage from "./routes/EndPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <CreateRoom />
          </Route>
          <Route path="/room/:roomID" component={Room} />
          <Route path="/end/:roomID">
            <EndPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
