import React from 'react'
import PropTypes from 'prop-types'
import { Mark } from 'react-mark.js'
import List from '../../../../components/List'

const ListInterfaceForTimezones = ({timezones, onSelectTimezone}) => {
  const timezoneList = React.useMemo(() => ({
    items: timezones
      .map(tz => ({
        id: tz.name,
        mainText: tz.name,
        subText: tz.countries
      })),
    onSelectItem: (tz) => {
      onSelectTimezone(tz.mainText)
    }
  }), [onSelectTimezone, timezones])
  return <List {...timezoneList} />
}

const TimeZoneList = ({ timezones, onSelectTimezone, searchTerm }) => (
  <Mark mark={searchTerm}>
    <ListInterfaceForTimezones
      timezones={timezones}
      onSelectTimezone={onSelectTimezone}
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
