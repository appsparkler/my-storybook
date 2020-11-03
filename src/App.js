import React from 'react'
import {Stack, Text}from '@fluentui/react'
import DateTimeForm from './components/DateTimeForm'
import moment from 'moment'

const useTimeField = () => {
  const [state, setState] = React.useState({
    value: '',
    errorMessage: ''
  });

  React.useEffect(() => {
    const currentTime = moment().format('HH:mm')
    setState(currentState => ({
      ...currentState,
      value: currentTime
    }))
  },[])

  const timeField = {
    ...state,
    onChange: (evt, value) => {
      const isValidValue = moment(value, 'HH:mm').isValid();
      const updatedState = {
        value
      }
      if(!isValidValue) {
        updatedState.errorMessage = "Time is  incorrect";
      }
      setState(updatedState)
    }
  }

  return timeField
}

const  useDateField = () => {
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
    onSelectDate: React.useCallback((selectedDate)=> {
      setState(currentState => ({
        ...currentState,
        value: selectedDate
      }))
    },[])
  }
  return dateField;
}

const useDateTimeForm = () => {
  const [state, setState] = React.useState({
    timestamp: ''
  })
  const dateTimeForm = {
    timeField: useTimeField(),
    dateField: useDateField()
  }
  return dateTimeForm;
}

const useTextTimestamp = () => {
  const textTimestamp = {
    children: "hello"
  }
  return textTimestamp;
}

function App() {
  const [state, setState] = React.useState({
    date: moment().toDate(),
    time: moment().format('HH:mm'),
    dateTime: 'df'
  })
  const dateTimeForm = useDateTimeForm({
    // onChangeDate
  })

  React.useEffect(() => {
    const dateTime = moment(`${state.date.toDateString()} ${state.time}`).valueOf()
    setState(currentState => ({
      ...currentState,
      dateTime
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
