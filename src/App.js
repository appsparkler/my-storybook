import React from 'react'
import {Stack, Text}from '@fluentui/react'
import DateTimeForm from './components/DateTimeForm'
import moment from 'moment'

const useTimeField = (args = {}) => {
  const {
    value,
    onChange
  } = args
  const [state, setState] = React.useState({
    // value: '',
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

const  useDateField = (args = {}) => {
  const {
    date,
    onSelectDate
  } = args;
  const  [state, setState] = React.useState({
    value: ''
  })

  React.useEffect(() => {
    const value = new Date();
    setState(currentState=> ({
      ...currentState,
      value
    }))
  },[])

  const dateField = {
    ...state,
    value: date,
    onSelectDate
  }
  return dateField;
}

const useDateTimeForm = (args) => {
  const {date, time, onSelectDate, onChangeTime} = args;
  const [state, setState] = React.useState({
    timestamp: ''
  })
  const dateTimeForm = {
    timeField: useTimeField({
      value: time,
      onChange: onChangeTime
    }),
    dateField: useDateField({
      date, onSelectDate
    })
  }
  return dateTimeForm;
}

function App() {
  const [state, setState] = React.useState({
    date: moment().toDate(),
    time: moment().format('HH:mm'),
    dateTime: 'df'
  })
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
    },[])
  })

  React.useEffect(() => {
    const dateTimeString = `${state.date.toDateString()} ${state.time}`;
    const dateTimeMoment = moment(dateTimeString)
    const isValid = dateTimeMoment.isValid();
    const dateTime = dateTimeMoment.valueOf()
    setState(currentState => ({
      ...currentState,
      dateTime: isValid ? dateTime : 'Date or time is not valid...'
    }))
  },[state.date, state.time])

  const textTimestamp = {
    children: state.dateTime
  }

  return (
    <Stack tokens={{childrenGap: 10, padding: 10}}>
      <h1>Time Tool</h1>
      <DateTimeForm {...dateTimeForm} />
      <Text
        style={{border: '2px dashed black', padding: '10px'}}
        {...textTimestamp}
      />
    </Stack>
  );
}

export default App;
