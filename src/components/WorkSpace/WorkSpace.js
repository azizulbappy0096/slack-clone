import React, { useEffect, useState } from "react";
import "./WorkSpace.css";

import Button from "@material-ui/core/Button";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import DnsIcon from "@material-ui/icons/Dns";
import db from "../../utils/firebaseConfig";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { actionTypes } from "../../utils/reducer";
import { useStateValue } from "../../utils/StateProvider";

function WorkSpace() {
  const [{ user }, dispatch] = useStateValue();
  const [PromiseWorkSpaces, setPromiseWorkSpaces] = useState([]);
  const [workSpaces, setWorkSpaces] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const docRef = db.collection("workStation");
    console.log(user.eMail)
    db.collection("workStation").onSnapshot((doc) => {
      console.log(doc);
      
      setPromiseWorkSpaces( doc.docs.map((dc) => {
        console.log(111111)
        return docRef
          .doc(dc.id)
          .collection("users")
          .get()
          .then((USER) => {
            
             return USER.docs.map((userData) => {
                console.log(userData.data());
                if (userData.data().email === user.eMail) {
                  return { id: dc.id, name: dc.data().name };
                } else {
                  return null;
                }
              });
          });
      }))
    });
  }, []);

  useEffect(() => {
    PromiseWorkSpaces.length > 0 && Promise?.all(PromiseWorkSpaces).then(value => {
     setWorkSpaces(
      value.map(v => {
        return v[0]
      })
     )
    })
  }, [PromiseWorkSpaces])

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

    db.collection("workStation")
    .add({
      name: workName
    })
    .then(doc => {
      docRef.doc(doc.id)
      .collection("users")
      .add({
        email: user.eMail,
        name: user.name
      })
    })
  };

  console.log(workSpaces);


  return (
    <div className="workSpace">
      <section className="workSpace__container">
        <h1> Your Workspaces </h1>
        
        {workSpaces.map((innerData) => {
            if(innerData) {
              return (
                <Button
                size="large"
                key={innerData?.id}
                onClick={() => redirect(innerData?.id, innerData?.name)}
              >
                <DnsIcon className="workSpace__btn--logo" />
                {innerData?.name}
              </Button>
              )
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
