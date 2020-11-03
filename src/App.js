import React from 'react'
import {Stack}from '@fluentui/react'
import DateTimeForm from './components/DateTimeForm'
import CopyTextTool from './components/CopyTextTool'
import moment from 'moment'

const useTimeField = (args = {}) => {
  const {
    value,
    onChange
  } = args
  const [state, setState] = React.useState({
    errorMessage: ''
  });

  const timeField = {
    ...state,
    value,
    onChange: React.useCallback((evt, time) => {
        const isValidValue = moment(time, 'HH:mm')
          .isValid();
      setState(currentState => ({
        ...currentState,
        errorMessage: isValidValue ? null : "Time is  incorrect"
      }))
      onChange(evt, time);
    },[onChange])
  }

  return timeField
}

const useDateTimeForm = (args) => {
  const {
    date, time, onSelectDate,
    onChangeTime,
    onChangeIsEndOfTimeCheckbox, isEndOfTime
  } = args;
  const dateTimeForm = {
    timeField: useTimeField({
      value: time,
      onChange: onChangeTime
    }),
    dateField: {
      value: date,
      onSelectDate
    },
    endOfTimeCheckbox: {
      value: isEndOfTime,
      onChange: onChangeIsEndOfTimeCheckbox
    }
  }
  return dateTimeForm;
}

function App() {
  const [state, setState] = React.useState({
    date: moment().toDate(),
    time: moment().format('HH:mm'),
    dateTime: '',
    isEndOfTime: false,
  })

  const hiddenInputRef = React.useRef(null)

  const copyTextTool = {
    text: state.dateTime,
    hiddenInputRef,
    onClickCopy: React.useCallback((...args) => {
      const inputElem = hiddenInputRef.current;
      inputElem.select();
      inputElem.setSelectionRange(0, 99999)
      document.execCommand("copy");
    },[hiddenInputRef])
  }

  const dateTimeForm = useDateTimeForm({
    date: state.date,
    time: state.time,
    onSelectDate: React.useCallback((selectedDate)=> {
      setState(currentState => ({
        ...currentState,
        date: selectedDate
      }))
    },[]),
    onChangeTime: React.useCallback((evt, time) => {
      setState(currentState => ({
        ...currentState,
        time,
      }))
    },[]),
    onChangeIsEndOfTimeCheckbox: React.useCallback((evt, isEndOfTime) => {
      setState(currentState => ({
        ...currentState,
        isEndOfTime
      }))
    },[]),
    isEndOfTime: state.isEndOfTime
  })

  React.useEffect(() => {
    const dateTimeString = `${state.date.toDateString()} ${state.time}`;
    let dateTimeMoment = moment(dateTimeString);
    if(state.isEndOfTime) {
      dateTimeMoment = dateTimeMoment.subtract(1, 'ms')
    }
    const isValid = dateTimeMoment.isValid();
    const dateTime = dateTimeMoment.valueOf()
    setState(currentState => ({
      ...currentState,
      dateTime: isValid ? dateTime : 'Date or time is not valid...'
    }))
  },[state.date, state.time, state.isEndOfTime])

  return (
    <Stack tokens={{childrenGap: 10, padding: 10}}>
      <h1>Time Tool</h1>
      <DateTimeForm {...dateTimeForm} />
      <CopyTextTool {...copyTextTool} />
      <pre>{JSON.stringify({dateTimeForm, state}, null, 2)}</pre>
    </Stack>
  );
}

export default App;
