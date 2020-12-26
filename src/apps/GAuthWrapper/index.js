import React from 'react';
import PropTypes from 'prop-types';

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
    default:
      return state
  }
}

const GoogleAuthProvider = ({
  children, onGAuth, onGapi, onAuth2,
  client_id
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // on Component mount - set gapi on state
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    document.body.appendChild(script);
    const intervalID = setInterval(() => {
      if(window.gapi) {
        dispatch({type: 'SET_GAPI'});
        onGapi(window.gapi);
        clearInterval(intervalID);
      }
    }, 300)
  }, [onGapi]);

  // on load gapi - set auth2 on state
  React.useEffect(() => {
    if(state.gapi) {
      state.gapi.load('auth2', () => {
        dispatch({type: 'SET_AUTH_2'})
        onAuth2(window.gapi.auth2)
      })
    }
  },[state.gapi, onAuth2])

  // on load auth2
  React.useEffect(() => {
    if(state.auth2) {
      state
        .auth2
        .init({client_id})
        .then((GoogleAuth) => {
          onGAuth(GoogleAuth)
          dispatch({
            type: 'SET_GOOGLE_AUTH',
            payload: { GoogleAuth }
          })
        });
    }
  },[state.auth2, onGAuth, client_id])

  // React.useEffect(() => {
  //   if(state.GoogleAuth) {
  //     state.GoogleAuth.disconnect()
  //     state.GoogleAuth.signIn()
  //       .then(console.log)
  //     console.log(state.GoogleAuth && [
  //       ...Object.keys(state.GoogleAuth.__proto__),
  //       ...Object.keys(state.GoogleAuth)
  //     ])
  //   }
  // },[state.GoogleAuth])

  return (
    <>
      <pre>{JSON.stringify(Object.keys(state), null, 2)}</pre>
      {children}
    </>
  )
}

GoogleAuthProvider.propTypes = {
  onGapi: PropTypes.func,
  onAuth2: PropTypes.func,
  onGAuth: PropTypes.func,
  client_id: PropTypes.string
};

export default React.memo(GoogleAuthProvider);
