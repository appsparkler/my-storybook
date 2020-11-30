import React from 'react';
import PropTypes from 'prop-types';
import {PrimaryButton} from  '@fluentui/react'

const PunchInButtonLayout = ({
  show, primaryButton
}) => show && <PrimaryButton {...primaryButton}/>

const PunchInButton = ({
  show, onClick
}) => {
  const [state] = React.useState({
    primaryButton: {
      text: 'Punch In',
      iconProps: {
        iconName: 'Leave'
      }
    }
  });

  const punchInButton = {
    show,
    primaryButton: {
      ...state.primaryButton,
      onClick
    }
  }

  return (<PunchInButtonLayout {...punchInButton} />)
}

PunchInButton.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool
}

export default React.memo(PunchInButton);
