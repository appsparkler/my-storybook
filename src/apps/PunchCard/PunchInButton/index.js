import React from 'react';
import PropTypes from 'prop-types';
import {PrimaryButton} from  '@fluentui/react'

const PunchInButtonLayout = ({
  show, primaryButton
}) => show && <PrimaryButton {...primaryButton}/>

const PunchInButton = ({
  show, onClick, text
}) => {
  const [state] = React.useState({
    primaryButton: {
      // iconProps: {
      //   iconName: 'Leave'
      // }
    }
  });

  const punchInButton = {
    show,
    primaryButton: {
      text,
      ...state.primaryButton,
      onClick
    }
  }

  return (<PunchInButtonLayout {...punchInButton} />)
}

PunchInButton.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool,
  text:PropTypes.string
}

export default React.memo(PunchInButton);
