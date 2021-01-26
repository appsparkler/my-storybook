export const FORMAT = 'YYYY-MM-DD HH:mm'

export const selectInputText = ({ elem, startPos, endPos }) => {
  elem.selectionStart = startPos
  elem.selectionEnd = endPos
}

export const selectTimeInDate = (elem) =>
  selectInputText({
    elem,
    startPos: 11,
    endPos: 16,
  })

export const messages = {
  START_YOUR_DAY: '😇Start Your Day',
  PUNCH_IN: 'Punch In',
}

// https://stackoverflow.com/a/38242552/4742733
export const convertMinutesToHours = (mins) => {
  if (!mins || isNaN(Number(mins))) return '00:00'
  const prefix = (() => {
    if (mins < 0) return '- '
    return ''
  })()
  mins = Math.abs(mins)
  let h = Math.floor(mins / 60)
  let m = mins % 60
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  return `${prefix}${h}:${m}`
}
