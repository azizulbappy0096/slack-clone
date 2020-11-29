import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { useStateValue } from "./utils/StateProvider";


function App() {

  return (
    <Router>
      <div className="app">
        <Header />
        <section className="app__body">
          <Sidebar />
          <Switch>
            <Route path="/l">
              <h3>chat</h3>
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;
