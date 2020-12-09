import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { useStateValue } from "./utils/StateProvider";
import LogIn from "./components/LogIn/LogIn";
import WorkSpace from "./components/WorkSpace/WorkSpace";
import { actionTypes } from "./utils/reducer";
import db from "./utils/firebaseConfig";
import Welcome from "./components/Welcome/Welcome";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: actionTypes.SET_USER,
          user: {
            name: user.displayName,
            eMail: user.email,
            id: user.uid,
            url: user.photoURL,
          },
        });

        const docRef = db.collection("workStation");

        db.collection("workStation").onSnapshot((doc) => {
       
          doc.docs.map((dc) => {
            docRef
              .doc(dc.id)
              .collection("users")
              .get()
              .then((USER) => {
                USER.docs.map((userData) => {
                  if (
                    userData.data().email === user.email &&
                    (userData.data().name === null ||
                      userData.data().name.length > 0)
                  ) {
                    docRef
                      .doc(dc.id)
                      .collection("users")
                      .doc(userData.id)
                      .update({
                        name: user.displayName,
                      });
                  }
                });
              });
          });
        });
      } else {
        console.log("nothing");
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/client/:workSpaceId">
            <Header />
            <section className="app__body">
              <Sidebar />
              <Switch>
                <Route path="/client/:workSpaceId/chat/:roomId">
                  <Chat />
                </Route>
                <Route path="/client/:workSpaceId">
                  <Welcome />
                </Route>
              </Switch>
            </section>
          </Route>
          <Route path="/">{!user ? <LogIn /> : <WorkSpace />}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
