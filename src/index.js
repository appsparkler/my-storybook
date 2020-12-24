import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fluentui/react/dist/css/fabric.min.css'
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

const GoogleLogin = () => {
  const [state, setState] = React.useState({
    gapi: null
  });

  const googleSignInRef = React.useRef();

  React.useEffect(() => {
    const intervalID = setInterval(() => {
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
    setState(currentState => ({
      ...currentState,
      authInstance: state.gapi.auth2.getAuthInstance()
    }))
  },[state.gapi])

  React.useEffect(() => {
    if(!state.authInstance) return;
    console.log({ai:state.authInstance});
  },[state.authInstance])

  React.useEffect(() => {
    if(!state.gapi) return null;
    state.gapi.signin2.render(
      googleSignInRef.current, {
      width: 232,
      height: 40,
      longtitle: true,
      onsuccess: onRender,
    });
  }, [state.gapi])

  if(!state.gapi) return null;
  return (
    <div ref={googleSignInRef} />
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
