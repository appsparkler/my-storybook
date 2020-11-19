import moment from 'moment'

export const reducePunchedSlotsToGoalAccomplished = (loop, slot) => {
  if(!slot.outTime) return loop
  const diff = moment(Number(slot.outTime))
  .diff(Number(slot.inTime), 'minutes')
  return loop + diff
}
