import React from 'react'
import {
  Stack, Layer, MessageBar, MessageBarType
}from '@fluentui/react'
import DateTimeForm from './components/DateTimeForm'
import CopyTextTool from './components/CopyTextTool'
import ShowHide  from './components/ShowHide'
import moment from 'moment'
import 'moment-timezone'

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
    },
    timezoneDropdown: {
      options: React.useMemo(() => {
        return moment.tz.names().map(tz => ({
          key: tz,
          text:  tz
        }))
      },[])
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
    showMessageBar: false,
    timeoutId: null
  })

  const copyTextFieldRef = React.useRef(null)

  const copyTextTool = {
    text: state.dateTime,
    copyTextFieldRef,
    onClickCopy: React.useCallback((...args) => {
      clearTimeout(state.timeoutId)
      const inputElem = copyTextFieldRef.current;
      inputElem.select();
      inputElem.setSelectionRange(0, 99999);
      document.execCommand("copy");
      const timeoutId = setTimeout(() => {
        setState(currentState => ({
          ...currentState,
          showMessageBar: false
        }))
      }, 2000)
      setState(currentState => ({
        ...currentState,
        showMessageBar: true,
        timeoutId
      }))

    },[copyTextFieldRef, state.timeoutId])
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
    isEndOfTime: state.isEndOfTime,
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
      <Stack horizontal  tokens={{childrenGap: 10}}>
        <Stack.Item>
          <CopyTextTool {...copyTextTool} />
        </Stack.Item>
        <Stack.Item>
          <ShowHide show={state.showMessageBar}>
            <Layer>
              <MessageBar messageBarType={MessageBarType.success}>
                Copied to clipboard.
              </MessageBar>
            </Layer>
          </ShowHide>
        </Stack.Item>
      </Stack>
      <pre>{JSON.stringify({dateTimeForm, state}, null, 2)}</pre>
    </Stack>
  );
}

export default App;
