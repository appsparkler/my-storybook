import moment from 'moment'

export const reducePunchedSlotsToGoalAccomplished = (loop, slot) => {
  if(!slot.outTime) return loop
  const diff = moment(Number(slot.outTime))
  .diff(Number(slot.inTime), 'minutes')
  return loop + diff
}

export const verifyNewInTime = ({
  slots, newInTime, item
}) => {
  // basic check if the  time is valid or not
  const newInTimeMoment = moment(newInTime, 'YYYY-MM-DD HH:mm');
  if(!newInTimeMoment.isValid()) return {
    isValid: false,
    errorMessage: 'Invalid date/time'
  }
  // test IF the time is less than previos outTime IF there is
  // a previous out time (newInTime should not be greater than previous out time)
  if(item.index > 0) {
    const previousItemIndex = item.index - 1
    const previousItem = slots[previousItemIndex];
    const prevOutTime = previousItem.outTime;
    const isPrevOutTimeLessThanNewInTime = newInTimeMoment.valueOf() <= prevOutTime;
    if(isPrevOutTimeLessThanNewInTime) {
      return {
        isValid: false,
        errorMessage: `< prev out`
      }
    }
  }
  // newInTime should be less than or equal to current outTime
  const {outTime} = item;
  if(outTime) {
    const isOutTimeLessThanNewInTime = outTime <= newInTimeMoment.valueOf()
    if(isOutTimeLessThanNewInTime) {
      return {
        isValid: false,
        errorMessage: `> current out.`
      }
    }
  }
  return {
    isValid: true
  }
}
