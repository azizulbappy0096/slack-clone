import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { useStateValue } from "./utils/StateProvider";
import LogIn from "./components/LogIn/LogIn";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <Router>
      <div className="app">
        {!user ? (
          <LogIn />
        ) : (
          <>
            {" "}
            <Header />
            <section className="app__body">
              <Sidebar />
              <Switch>
                <Route path="/chat/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <h1> Welcome!!! </h1>
                </Route>
              </Switch>
            </section>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
