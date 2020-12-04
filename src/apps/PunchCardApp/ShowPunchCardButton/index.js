import React from 'react';
import PropTypes from 'prop-types'
import {IconButton, PrimaryButton} from '@fluentui/react'

const ShowPunchCardsButtonLayout = ({
  iconButton0, primaryButton0
}) => (
  <>
    <IconButton
      {...iconButton0}
    />
    <PrimaryButton
      {...primaryButton0}
    />
  </>
);
const ShowPunchCardsButton = ({
  onClick
}) => {

  const showPunchCardsButton = {
    iconButton0: {
      type: 'submit',
      className: 'ms-hiddenMdUp',
      title: 'Show Punch Cards',
      iconProps:{
        iconName: 'RedEye'
      },
      onClick
    },
    primaryButton0: {
      className:"ms-hiddenSm",
      type:"submit",
      iconProps:{
        iconName: 'RedEye'
      },
      text: 'Show Punch Cards',
      title: 'Show Punch Cards',
      onClick
    }
  }

  return <ShowPunchCardsButtonLayout {...showPunchCardsButton} />
}

ShowPunchCardsButton.propTypes = {
  onClick: PropTypes.func
}

export default React.memo(ShowPunchCardsButton);
