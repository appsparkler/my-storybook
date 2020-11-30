import React from 'react';
import PropTypes from 'prop-types';
import {PrimaryButton} from  '@fluentui/react'

const PunchInButtonLayout = ({
  show, primaryButton
}) => show && <PrimaryButton {...primaryButton}/>

const PunchInButton = ({
  show, onClick, text, hasIcon
}) => {
  const [state] = React.useState({
    primaryButton: {}
  });

  const punchInButton = {
    show,
    primaryButton: {
      text,
      iconProps: React.useMemo(() => hasIcon && ({
        iconName: 'Leave'
      }), [hasIcon]),
      ...state.primaryButton,
      onClick
    }
  }

  return (<PunchInButtonLayout {...punchInButton} />)
}

PunchInButton.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool,
  hasIcon: PropTypes.bool,
  text:PropTypes.string
}

export default React.memo(PunchInButton);
