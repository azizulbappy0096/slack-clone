import React from 'react';
import "./LogIn.css";

import { Button } from '@material-ui/core';
import firebase from "firebase";
import { googleProvider } from '../../utils/firebaseConfig';
import { useStateValue } from '../../utils/StateProvider';
import { actionTypes } from '../../utils/reducer';

function LogIn() {
    const [state, dispatch] = useStateValue();

    const signIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
        .then(success => {
            console.log(success);
            dispatch({
                type: actionTypes.SET_USER,
                user: {
                    name: success.user.displayName,
                    eMail: success.user.email,
                    id: success.user.uid
                }
            })
        })
        .catch(error => {
            alert(error.message)
        })
    }

    return (
        <div className="login">
            <section className="login__container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/800px-Slack_icon_2019.svg.png" alt="Slack_Logo" />

            <section className="login__intro">
                <h1> Sign in to Slack-Clone </h1>
                <h6> azizulbappy.slack.com </h6>
            </section>

            <Button variant="contained" onClick={signIn}> Sign in with Google </Button>
            </section>
        </div>
    )
}

export default LogIn;
