import React, { useEffect, useState } from "react";
import "./WorkSpace.css";

import Button from "@material-ui/core/Button";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import DnsIcon from "@material-ui/icons/Dns";
import db from "../../utils/firebaseConfig";

import { useHistory } from "react-router-dom";
import { actionTypes } from "../../utils/reducer";
import { useStateValue } from "../../utils/StateProvider";

function WorkSpace() {
  const [{ user }, dispatch] = useStateValue();
  const [PromiseWorkSpaces, setPromiseWorkSpaces] = useState([]);
  const [workSpaces, setWorkSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noWork, setNoWork] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const docRef = db.collection("workStation");

    db.collection("workStation").onSnapshot((doc) => {
      if (doc.empty) {
        setIsLoading(false);
        setNoWork(true);
      }
      setPromiseWorkSpaces(
        doc.docs.map((dc) => {
          return docRef
            .doc(dc.id)
            .collection("users")
            .get()
            .then((USER) => {
              if (USER) {
                setIsLoading(false);
              }
              return USER.docs.map((userData) => {
                if (userData.data().email === user.eMail) {
                  return { id: dc.id, name: dc.data().name };
                } else {
                  return null;
                }
              });
            });
        })
      );
    });
  }, []);

  useEffect(() => {
    PromiseWorkSpaces.length > 0 &&
      Promise?.all(PromiseWorkSpaces).then((value) => {
        setWorkSpaces(
          value.map((v) => {
            for (let i = 0; i < v.length; i++) {
              if (v[i]) {
                console.log("I am solid>>", v[i]);
                return v[i];
              }
            }
          })
        );
      });
  }, [PromiseWorkSpaces]);

  const redirect = (id, name) => {
    console.log(id, name);
    dispatch({
      type: actionTypes.SET_WORKSPACE,
      workSpace: name,
    });
    history.push(`/client/${id}`);
  };

  const addWorkSpace = () => {
    const workName = prompt("Enter your work-space name: ");
    const docRef = db.collection("workStation");

    if (workName && workName.length > 0) {
      db.collection("workStation")
        .add({
          name: workName,
        })
        .then((doc) => {
          docRef
            .doc(doc.id)
            .collection("users")
            .add({
              email: user.eMail,
              name: user.name,
            })
            .then(() => {
              history.push(`/client/${doc.id}`);
            });
        });
    }
  };

  console.log(workSpaces);

  return (
    <div className="workSpace">
      <section className="workSpace__container">
        <h1> Your Workspaces </h1>
        {isLoading && (
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Loading.svg/800px-Vector_Loading.svg.png" />
        )}
        {noWork && <p> You have no WorkSpaces</p>}

        {workSpaces.map((innerData) => {
          if (innerData && !isLoading) {
            return (
              <Button
                size="large"
                key={innerData?.id}
                onClick={() => redirect(innerData?.id, innerData?.name)}
              >
                <DnsIcon className="workSpace__btn--logo" />
                {innerData?.name}
              </Button>
            );
          }
        })}
        <AddCircleOutlineRoundedIcon
          className="workSpace__addBtn"
          onClick={addWorkSpace}
        />
      </section>
    </div>
  );
}

export default WorkSpace;
