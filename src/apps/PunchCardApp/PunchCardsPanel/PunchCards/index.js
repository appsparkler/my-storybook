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

const PunchCardListItemWithoutMemo= ({
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

PunchCardListItemWithoutMemo.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.string
}

export const PunchCardListItem = React.memo(PunchCardListItemWithoutMemo)

const PunchCards = ({punchCards}) => Array.isArray(punchCards) && punchCards
  .map((punchCard) => {
    return <PunchCardListItem key={punchCard.id} {...punchCard} />
  })

export default React.memo(PunchCards);
