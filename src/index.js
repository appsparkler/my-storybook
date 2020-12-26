import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import {Stack, DefaultButton} from '@fluentui/react'
import reportWebVitals from './reportWebVitals';
import '@fluentui/react/dist/css/fabric.min.css'
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

const initialState = {
  gapi: null,
  GoogleAuth: null,
  auth2: null
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_GAPI':
      return {
        ...state,
        gapi: window.gapi
      }
    case 'SET_AUTH_2':
      return {
        ...state,
        auth2: window.gapi.auth2
      }
    case 'SET_GOOGLE_AUTH':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_SIGNED_IN':
      return {
        ...state,
        isSignedIn: action.isSignedIn
      }
  }
}

const GoogleLogin = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // on Component mount - set gapi on state
  React.useEffect(() => {
    const intervalID = setInterval(() => {
      if(window.gapi) {
        dispatch({type: 'SET_GAPI'})
        clearInterval(intervalID);
      }
    }, 300)
  }, []);

  // on load gapi - set auth2 on state
  React.useEffect(() => {
    if(state.gapi) {
      const auth2 = state.gapi.load('auth2', () => {
        dispatch({type: 'SET_AUTH_2'})
      })
    }
  },[state.gapi])

  // on load auth2
  React.useEffect(() => {
    if(state.auth2) {
      state
        .auth2
        .init()
        .then((GoogleAuth) => dispatch({
          type: 'SET_GOOGLE_AUTH',
          payload: { GoogleAuth }
        }));
    }
  },[state.auth2])

  React.useEffect(() => {
    if(state.GoogleAuth) {
      state.GoogleAuth.disconnect()
      state.GoogleAuth.signIn()
        .then(console.log)
      console.log(state.GoogleAuth && [
        ...Object.keys(state.GoogleAuth.__proto__),
        ...Object.keys(state.GoogleAuth)
      ])
    }
  },[state.GoogleAuth])

  // React.useEffect(() => {
  //   if(state.gapi) {
  //     const auth2 = state.gapi.init('auth2')
  //     console.log(auth2);
  //   }
  // },[state.gapi])

  // React.useEffect(() => {
  //   if(state.gapi) {
  //     state.gapi.load('auth2', () => {
  //       state.gapi.auth2.init();
  //       const authInstance = state.gapi.auth2.getAuthInstance();
  //       setState(currentState => ({
  //         ...currentState,
  //         authInstance
  //       }))
  //     });
  //   }
  // }, [state.gapi])

  // const onLogout = React.useCallback(async() => {
  //   await state.authInstance.disconnect();
  //   const isSignedIn = state.authInstance.isSignedIn.get();
  //   setState(currentState => ({
  //     ...currentState,
  //     isSignedIn
  //   }))
  // }, [state])

  // const signIn = React.useCallback(async() => {
  //   const res = await state.authInstance.signIn()
  //     .catch(err => err);
  //
  //   const isSignedIn = res.isSignedIn();
  //   setState(currentState => ({
  //     ...currentState,
  //     isSignedIn
  //   }))
  // },[state.authInstance])

  // React.useEffect(() => {
    // if(!state.gapi) return;
    // if(state.isSignedIn) return;
    // state.gapi.signin2.render(
    //   googleSignInRef.current, {
    //   width: 232,
    //   height: 40,
    //   longtitle: true,
    //   onsuccess: onRender,
    // });
  // },[state.isSignedIn, state.gapi, onRender])

  // if(!state.gapi) return null;
  // if(!state.isSignedIn) {
  //   return <DefaultButton onClick={signIn}>
  //     Sign In With Goolge
  //   </DefaultButton>
  // }
  // return (
  //   <Stack>
  //     User is signed in:
  //     <DefaultButton onClick={onLogout}>
  //       Disconnect
  //     </DefaultButton>
  //   </Stack>
  // )

  return <pre>{JSON.stringify(Object.keys(state), null, 2)}</pre>
}

// TODO - have a centralized place to import modules from
// TODL - add a dark-theme for the application
ReactDOM.render(
  <React.StrictMode>
    <GoogleLogin />
    {/*<App />*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
