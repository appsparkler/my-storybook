import React from 'react'
import moment from 'moment'
import 'moment-timezone';
import {
  Stack, Layer,
  MessageBar, MessageBarType,
  DropdownMenuItemType
} from '@fluentui/react'
import {uniq as _uniq} from 'lodash'
import TIMEZONE_JSON from 'moment-timezone/data/packed/latest'
import DateTimeForm from './components/DateTimeForm'
import CopyTextTool from './components/CopyTextTool'
import ShowHide  from './components/ShowHide'

const setInLocalStorage = ({key, value}) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    )
  } catch (e) {
    console.error(e)
  }
}

const getFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value)
  } catch (e) {
    console.error(e)
  }
}

const LOCAL_STORAGE_KEYS = {
  recentOptions: 'appsparkler-time-tool--recentOptions',
  timezoneKey: 'appsparkler-time-tool--timezoneKey'
}

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
    },[onChange]),
    onFocus: React.useCallback((evt) => {
      evt.target.select();
      evt.target.select(0, 99999)
    },[])
  }
}

const useTimezoneDropdown = (args = {}) => {
  const {
    onChange,
    selectedKey
  } = args;

  const [state, setState] = React.useState({
    recentOptions: [],
    options: [],
    timezoneOptions: moment.tz.names()
      .map(tz => ({
        key: tz,
        text: tz
      })),
  })

  // On mount, get-recent-items-from-local-storage
  React.useEffect(() => {
    const recentOptions = getFromLocalStorage(LOCAL_STORAGE_KEYS.recentOptions);
    if(Array.isArray(recentOptions) && recentOptions.length) {
      setState(currentState => ({
        ...currentState,
        recentOptions
      }))
    }
  },[])

  // selected-key effects -  updated local-storage
  React.useEffect(() => {
    if(selectedKey)  {
      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.timezoneKey,
        value: selectedKey
      })
    }
  },[selectedKey])

  // on change in recent-options
  React.useEffect(() =>  {
    const hasRecentOptions = state.recentOptions.length
    if(!hasRecentOptions) {
      setState(currentState =>  ({
        ...currentState,
        options: [...currentState.timezoneOptions]
      }))
    } else {
      setState(currentState  => {
        setInLocalStorage({
          key: LOCAL_STORAGE_KEYS.recentOptions,
          value: currentState.recentOptions
        })
        const timezoneOptionsWithoutRecent = currentState
          .timezoneOptions
          .filter(timezoneOption => {
            const isInRecentOptions = currentState
              .recentOptions
              .some(recentOption  => recentOption.key === timezoneOption.key)
            return !isInRecentOptions
          })
        const options = [{
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
          ...timezoneOptionsWithoutRecent,
        ]
        return {
          ...currentState,
          options
        }
      })
    }
  },[state.recentOptions])

  return {
    options: state.options,
    selectedKey,
    onChange: React.useCallback((...args) =>  {
      const [,selectedOption] =  args;
      setState(currentState => {
        const recentOptions = _uniq([
          selectedOption,
          ...currentState.recentOptions
        ]);
        return {
          ...currentState,
          recentOptions
        }
      })
      onChange(...args)
    },[onChange]),
  }
}

const useDateTimeForm = (args) => {
  const {
    date, time, timezoneKey,
    onSelectDate,
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
      onChange: onChangeTimezone,
      selectedKey: timezoneKey
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
    timezoneKey: null
  })

  const copyTextTool = {
    text: state.dateTime,
    // copyTextFieldRef,
    onClickCopy: React.useCallback((evt) => {
      clearTimeout(state.timeoutId)
      const inputElem = evt.target;
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

    },[state.timeoutId])
  }

  const dateTimeForm = useDateTimeForm({
    date: state.date,
    time: state.time,
    timezoneKey: state.timezoneKey,
    isEndOfTime: state.isEndOfTime,
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
    onChangeTimezone: React.useCallback((evt, selectedOption) => {
      const timezone = selectedOption.key;
      setState(currentState => ({
        ...currentState,
        timezone,
        timezoneKey: selectedOption.key
      }))
    },[])
  })

  // On mount effects - load timezones, set-initial-timezone-key
  React.useEffect(() => {
    moment.tz.load(TIMEZONE_JSON);
    const timezoneKey  = getFromLocalStorage(LOCAL_STORAGE_KEYS.timezoneKey)
    if(timezoneKey) {
      setState(currentState => ({
        ...currentState,
        timezoneKey
      }))
    } else {
      const timezoneKey = moment.tz.guess(true)
      setState(currentState  => ({
        ...currentState,
        timezoneKey
      }))
    }
  }, [])

  // Effects when values on the time-tool form are updated
  React.useEffect(() => {
    const dateString = moment(state.date).format('YYYY-MM-DD')
    const isValidTime = moment(state.time, 'HH:mm').isValid()
    if(isValidTime)  {
      const dateTimeString = `${dateString} ${state.time}`;
      const sanitizedDateTimeString = dateTimeString.replace(/_/g, '0')
      let dateTimeMoment = moment(sanitizedDateTimeString);
      if(state.timezoneKey) {
        dateTimeMoment  = dateTimeMoment.tz(state.timezoneKey, true);
      }
      if(state.isEndOfTime) {
        dateTimeMoment = dateTimeMoment.subtract(1, 'ms')
      }
      const isValid = dateTimeMoment.isValid();
      const dateTime = dateTimeMoment.valueOf();
      setState(currentState => ({
        ...currentState,
        dateTime: isValid ? dateTime : 'Date or time is not valid...'
      }))
    }
  },[state.date, state.time, state.isEndOfTime, state.timezoneKey])

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
    </Stack>
  );
}

export default React.memo(App);
