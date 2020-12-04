import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, Text
} from '@fluentui/react'

const PunchCardListItemLayout = ({
  iconButton0, iconButton1,
  text
}) => (
  <Text variant="large" as="em">
    <IconButton
      {...iconButton0}
    />
    {text}
    <IconButton {...iconButton1}/>
  </Text>
)

export const PunchCardListItem = ({
  onEdit, onDelete, title
}) => {
  const punchCardListItem = {
    iconButton0: {
      primary: true,
      iconProps: {
        iconName: 'Edit'
      },
      onClick: onEdit
    },
    iconButton1: {
      iconProps: {
        iconName: 'Delete'
      },
      onClick: onDelete
    },
    text: title
  }

  return <PunchCardListItemLayout
    {...punchCardListItem}
  />
}

PunchCardListItem.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.string
}

const PunchCards = ({punchCards}) => Array.isArray(punchCards) && punchCards
  .map(() => {
    return <PunchCardListItem />
  })

export default React.memo(PunchCards);
