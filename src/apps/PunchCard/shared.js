export const FORMAT = 'YYYY-MM-DD HH:mm'

export const selectInputText = ({
  elem, startPos, endPos
}) => {
  elem.selectionStart = startPos;
  elem.selectionEnd = endPos;
}

export const selectTimeInDate = (elem) => selectInputText({
  elem, startPos: 11, endPos: 16
})

export const messages = {
  START_YOUR_DAY: "Start Your Day",
  PUNCH_IN: "Punch In"
}
