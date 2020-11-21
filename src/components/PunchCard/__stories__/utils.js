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

export const verifyNewOutTime = ({
  newOutTime,
  modifiedItems,
  id,
  currentTime = new Date().valueOf()
}) => {
  const newOutTimeMoment = moment(newOutTime,  'YYYY-MM-DD HH:mm')
  const modifiedItem = modifiedItems
    .reduce((loop, modifiedItem) => modifiedItem.id === id ? modifiedItem : loop, null)

  // invalidate if invalid
  if(!newOutTimeMoment.isValid()) {
    return  {
      isValid: false,
      errorMessage: 'Invalid date/time'
    }
  }

  // invalidate if newOutTime is > current-time
  // is new-out-time > current-time
  const isGreater = newOutTimeMoment > moment(currentTime)
  if(isGreater) {
    return {
      isValid: false,
      errorMessage: '> current-time'
    }
  }

  // invalidate if newOutTime < current-in-time
  const isOutTimeLessThanInTime = newOutTimeMoment < moment(modifiedItem.inTime)
  if(isOutTimeLessThanInTime) {
    return {
      isValid: false,
      errorMessage: `< in-time`
    }
  }

  //invalidate if outTime is > next-slot in time
  const nextItemIndex = modifiedItem.index + 1;
  const hasNextItem = Boolean(modifiedItems[nextItemIndex]);
  if(hasNextItem) {
    const nextItem = modifiedItems[nextItemIndex];
    const isGreater = newOutTimeMoment > moment(nextItem.inTime);
    if(isGreater) {
      return {
        isValid: false,
        errorMessage: '> next-slot-in-time'
      }
    }
  }

  return {
    isValid: true,
  }
}
