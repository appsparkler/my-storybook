import React from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

const ListItems = ({ items, onSelectItem }) => {
  const listItems = items.map((item) => (
    <ListItem key={item.id} onClick={onSelectItem} {...item} />
  ))
  return <>{listItems}</>
}

ListItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      isLast: PropTypes.bool,
      mainText: PropTypes.string,
      subText: PropTypes.string,
    })
  ),
  onSelectItem: PropTypes.func,
}

export default ListItems
