import React from 'react';
import PropTypes from 'prop-types'
import {IconButton, DefaultButton} from '@fluentui/react'
import PunchCardsPanel from './PunchCardsPanel'

const ShowPunchCardsButtonLayout = ({
  iconButton0, defaultButotn0, punchCardsPanel
}) => (
  <>
    <IconButton
      {...iconButton0}
    />
    <DefaultButton
      {...defaultButotn0}
    />
    <PunchCardsPanel {...punchCardsPanel}/>
  </>
);
const ShowPunchCardsButton = ({
  onClick, disabled,
  items, isOpenPanel,
  onDismiss, onDeletePunchCard,
  onSelectPunchCard,
}) => {

  const showPunchCardsButton = {
    iconButton0: {
      type: 'submit',
      disabled,
      className: 'ms-hiddenXlUp',
      title: 'Show Punch Cards',
      iconProps:{
        iconName: 'RedEye'
      },
      onClick
    },
    defaultButotn0: {
      className:"ms-hiddenLgDown",
      disabled,
      type:"submit",
      iconProps:{
        iconName: 'RedEye'
      },
      text: 'Show Punch Cards',
      title: 'Show Punch Cards',
      onClick
    },
    punchCardsPanel: {
      items,
      isOpen: isOpenPanel,
      onDismiss, onDeletePunchCard,
      onSelectPunchCard,
    }
  }

  return <ShowPunchCardsButtonLayout {...showPunchCardsButton} />
}

ShowPunchCardsButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isOpenPanel: PropTypes.bool,
  items: PropTypes.array,
  onDeletePunchCard: PropTypes.func,
  onSelectPunchCard: PropTypes.func,
}

ShowPunchCardsButton.defaultProps = {
  items: []
}

export default React.memo(ShowPunchCardsButton);
