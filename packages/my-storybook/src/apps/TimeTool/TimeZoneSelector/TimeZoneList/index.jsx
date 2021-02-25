import React from 'react'
import PropTypes from 'prop-types'
import { Mark } from 'react-mark.js'
import List from '../../../../components/List'

const TimeZoneList = ({ timezones, onSelectTimezone, searchTerm }) => (
  <Mark mark={searchTerm}>
    <List
      items={timezones}
      onSelectItem={onSelectTimezone}
    />
  </Mark>
)

TimeZoneList.propTypes = {
  timezones: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onSelectTimezone: PropTypes.func,
    })
  ),
  onSelectTimezone: PropTypes.func,
  searchTerm: PropTypes.string,
}

TimeZoneList.defaultProps = {
  timezones: [],
  searchTerm: '',
}

export default React.memo(TimeZoneList)
