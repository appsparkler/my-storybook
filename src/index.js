import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {DefaultButton} from '@fluentui/react'
import reportWebVitals from './reportWebVitals';
import '@fluentui/react/dist/css/fabric.min.css'
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

const GoogleLogin = () => {
  const [state, setState] = React.useState({
    gapi: null,
    authInstance: null,
    isSignedIn: false
  });

  const googleSignInRef = React.useRef();

  React.useEffect(() => {
    const intervalID = setInterval(() => {
      console.log(window.gapi)
      if(window.gapi) {
        setState(currentState => ({
          ...currentState,
          gapi: window.gapi
        }))
        clearInterval(intervalID);
      }
    },300)
  }, []);

  const onRender = React.useCallback(() => {
    const authInstance = state.gapi.auth2.getAuthInstance();
    console.log({authInstance})
    setState(currentState => ({
      ...currentState,
      authInstance
    }))
  },[state.gapi])

  React.useEffect(() => {
    if(!state.authInstance) return;
    console.log({ai:state.authInstance});
  },[state.authInstance])

  React.useEffect(() => {
    if(!state.gapi) return null;
    state.gapi.load('auth2', () => {
      state.gapi.auth2.init()
      const authInstance = state.gapi.auth2.getAuthInstance();
      const isSignedIn = authInstance.isSignedIn.get();
      setState(currentState => ({
        ...currentState,
        authInstance,
        isSignedIn
      }))
    });
    state.gapi.signin2.render(
      googleSignInRef.current, {
      width: 232,
      height: 40,
      longtitle: true,
      onsuccess: onRender,
    });
  }, [state.gapi, onRender])

  const onLogout = React.useCallback(() => {
    console.log({state})
  }, [state])

  const signIn = React.useCallback(async() => {
    const res = await state.authInstance.signIn()
      .catch(err => err);
      
    const isSignedIn = res.isSignedIn();
    setState(currentState => ({
      ...currentState,
      isSignedIn
    }))
  },[state.authInstance])

  if(!state.gapi) return null;
  if(!state.isSignedIn) {
    return <DefaultButton onClick={signIn} text="Sign In With Google" />
  }
  return (
    <DefaultButton onClick={onLogout}>
      Log out
    </DefaultButton>
  )
}

// TODO - have a centralized place to import modules from
// TODL - add a dark-theme for the application
ReactDOM.render(
  <React.StrictMode>
    <GoogleLogin />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
