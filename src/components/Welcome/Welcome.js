import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import db from '../../utils/firebaseConfig';
import { actionTypes } from '../../utils/reducer';
import { useStateValue } from '../../utils/StateProvider';
import "./Welcome.css";

function Welcome() {
    const [workSpaceName, setWorkSpaceName] = useState("");
    const [link, setLink] = useState(true)
    const { workSpaceId } = useParams();
    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        db
        .collection("workStation")
        .doc(workSpaceId)
        .get()
        .then(doc => {
            setWorkSpaceName(doc.data().name)
        });

        window.addEventListener("resize", () => {
            console.log(window.innerWidth)
            if(window.innerWidth <= 768) {
              setLink(true);
            }else {
              setLink(false);
            }
          })
        
          return () => {
            window.addEventListener("resize", () => {
              console.log(window.innerWidth)
              if(window.innerWidth <= 768) {
                  setLink(true);
              }else {
                  setLink(false);
              }
            })
          }
    }, []);



      const showSidebar = () => {
        dispatch({
          type: actionTypes.SET_SIDEBAR,
          sidebar: true
        });
      }

    return (
        <div className="welcome">
            <div className="welcome__container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/800px-Slack_icon_2019.svg.png" alt="slack-logo" />
            <h1> Welcome to {workSpaceName} </h1>
            <a onClick={showSidebar} style={link && window.innerWidth <= 768 ? {display: "block"} : {display: "none"}} > Show More Menu...</a>
            </div>
        </div>
    )
}

export default Welcome;
