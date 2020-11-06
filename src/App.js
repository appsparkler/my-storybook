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

// TODO: STORE last selected timezone and restore on page refresh
// TODO: MOVE selected-timezone state to root

const LOCAL_STORAGE_RECENT_OPTIONS_KEY = 'appsparkler-time-tool--recentItems';

const LOCAL_STORAGE_KEYS = {
  recentItems: 'appsparkler-time-tool--recentItems',
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
    },[onChange])
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
        text:  tz
      })),
  })

  React.useEffect(() =>  {
    if(state.recentOptions.length) {
      if(window.localStorage) {
        window.localStorage.setItem(
          LOCAL_STORAGE_RECENT_OPTIONS_KEY,
          JSON.stringify(state.recentOptions, null, 2)
        )
      }
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

  React.useEffect(() => {
    if(!window.localStorage) return;
    const recentOptions = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_RECENT_OPTIONS_KEY)
    );
    if(Array.isArray(recentOptions) && recentOptions.length) {
      setState(currentState => ({
        ...currentState,
        recentOptions
      }))
    }
  },[])

  React.useEffect(() => {
    if(localStorage && selectedKey) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.timezoneKey,
        selectedKey
      )
    }
  },[selectedKey])

  return {
    options: state.options,
    selectedKey,
    onChange: React.useCallback((...args) =>  {
      const [,selectedOption] =  args;
      const isSelectedKeyInRecentOptions = state.recentOptions
        .some(option => option.key === selectedOption.key)
      if (isSelectedKeyInRecentOptions) {
        const recentOptions = _uniq([selectedOption, ...state.recentOptions])

        setState(currentState => ({
          ...currentState,
          recentOptions,
        }))
      } else {
        setState((currentState) =>  {
          return ({
            ...currentState,
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

  React.useEffect(() => {
    moment.tz.load(TIMEZONE_JSON);
    if(localStorage) {
      const timezoneKey = localStorage.getItem(LOCAL_STORAGE_KEYS.timezoneKey)
      if(timezoneKey) {
        setState(currentState => ({
          ...currentState,
          timezoneKey
        }))
      } else {
        setState(currentState  => ({
          ...currentState,
          timezoneKey: moment.tz.guess(true)
        }))
      }
    }
  },[])

  // Effects when values on the time-tool form are updated
  React.useEffect(() => {
    const dateString = moment(state.date).format('YYYY-MM-DD')
    const dateTimeString = `${dateString} ${state.time}`;
    let dateTimeMoment = moment(dateTimeString)
    if(state.timezoneKey) {
      dateTimeMoment  = dateTimeMoment.tz(state.timezoneKey, true);
    }
    if(state.isEndOfTime) {
      dateTimeMoment = dateTimeMoment.subtract(1, 'ms')
    }
    const isValid = dateTimeMoment.isValid();
    const dateTime = dateTimeMoment.valueOf()
    setState(currentState => ({
      ...currentState,
      dateTime: isValid ? dateTime : 'Date or time is not valid...'
    }))
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
