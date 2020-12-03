import React  from 'react'
import DetailsListWithText from '../../'

const ScheduledSlots = ({
  detailsListWithText
}) => <DetailsListWithText {...detailsListWithText} />


export default React.memo(ScheduledSlots)
