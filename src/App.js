import React from 'react'
import moment from 'moment'
import 'moment-timezone';
import {
  Stack, Layer, MessageBar, MessageBarType,
  DropdownMenuItemType
}from '@fluentui/react'
import TIMEZONE_JSON from './data/timezones'
import DateTimeForm from './components/DateTimeForm'
import CopyTextTool from './components/CopyTextTool'
import ShowHide  from './components/ShowHide'

// TODO: Save recent options in local-storage
const useTimeField = (args = {}) => {
  const {
    value,
    onChange,
  } = args

  const [state, setState] = React.useState({
    errorMessage: ''
  });

  return {
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
}

const useTimezoneDropdown = (args = {}) => {
  const {
    onChange,
  } = args;

  const [state, setState] = React.useState({
    recentOptions: [],
    options: [],
    timezoneOptions: moment.tz.names()
      .map(tz => ({
        key: tz,
        text:  tz
      })),
    selectedKey: null
  })

  React.useEffect(() =>  {
    if(state.recentOptions.length) {
      setState(currentState => ({
        ...currentState,
        options: [{
          key: 'recentHeader',
          text: 'Recent',
          itemType: DropdownMenuItemType.Header
        },
        ...currentState.recentOptions,
        {
          key: 'allTimezonesHeader',
          text: 'All Timezones',
          itemType: DropdownMenuItemType.Header
        },
        ...currentState.timezoneOptions,
      ]
      }))
    } else {
      setState(currentState => ({
        ...currentState,
        options: [
          ...currentState.timezoneOptions
        ]
      }))
    }
  },[state.recentOptions, state.timezoneOptions]);

  return {
    options: state.options,
    selectedKey: state.selectedKey,
    onChange: React.useCallback((...args) =>  {
      const [,selectedOption] =  args;
      const isSelectedKeyInRecentOptions = state.recentOptions
        .some(option => option.key === selectedOption.key)
      if (isSelectedKeyInRecentOptions) {
        setState(currentState => ({
          ...currentState,
          selectedKey: selectedOption.key
        }))
      } else {
        setState((currentState) =>  {
          return ({
            ...currentState,
            selectedKey: selectedOption.key,
            recentOptions: [selectedOption, ...currentState.recentOptions],
            timezoneOptions: currentState.timezoneOptions
              .filter(option => option.key !== selectedOption.key)
          })
        })
      }
      onChange(...args)
    },[onChange, state.recentOptions]),
  }
}

const useDateTimeForm = (args) => {
  const {
    date, time, onSelectDate,
    onChangeTime, onChangeTimezone,
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
    timezoneDropdown: useTimezoneDropdown({
      onChange: onChangeTimezone
    })
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
    timeoutId: null,
    timezone: moment.tz.guess(),
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
    }, []),
    isEndOfTime: state.isEndOfTime,
    onChangeTimezone: React.useCallback((evt, selectedKey) => {
      const timezone = selectedKey.key;
      // alert(JSON.stringify(timezone, null, 2))
      setState(currentState => ({
        ...currentState,
        timezone
      }))
    },[])
  })

  React.useEffect(() => {
    const dateString = moment(state.date).format('YYYY-MM-DD')
    const dateTimeString = `${dateString} ${state.time}`;
    let dateTimeMoment = moment(dateTimeString).tz(state.timezone, true);
    if(state.isEndOfTime) {
      dateTimeMoment = dateTimeMoment.subtract(1, 'ms')
    }
    const isValid = dateTimeMoment.isValid();
    const dateTime = dateTimeMoment.valueOf()
    setState(currentState => ({
      ...currentState,
      dateTime: isValid ? dateTime : 'Date or time is not valid...'
    }))
  },[state.date, state.time, state.isEndOfTime, state.timezone])

  React.useEffect(() => {
    moment.tz.load(TIMEZONE_JSON);
  },[])

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
