import React from 'react'
import moment from 'moment'
import 'moment-timezone'
import {
  Stack,
  Layer,
  Text,
  MessageBar,
  MessageBarType,
  DropdownMenuItemType,
  DefaultButton,
  TextField,
} from '@fluentui/react'
import { getTheme, FontWeights } from 'office-ui-fabric-react/lib/Styling'
import { uniq as _uniq } from 'lodash'
import TIMEZONE_JSON from 'moment-timezone/data/packed/latest'
import DateTimeForm from '../../components/DateTimeForm'
import ShowHide from '../../components/ShowHide'
import CustomLabel from '../../components/CustomLabel/variantA'
import { initializeIcons } from '@uifabric/icons'

initializeIcons()

const useTimestampTextField = (args = {}) => {
  const { value = '', onChange = () => null, description = '' } = args

  const styles = React.useMemo(() => {
    const theme = getTheme()
    return {
      root: {
        color: theme.palette.green,
        fontWeight: FontWeights.bold,
      },
    }
  }, [])

  return {
    value,
    placeholder: 'Try a timestamp...',
    description,
    onChange,
    onClick: React.useCallback((evt) => {
      evt.target.select()
      evt.target.select(0, 99999)
    }, []),
    onRenderLabel: React.useCallback(
      ({ label, id }) => (
        <CustomLabel
          label="Paste a timestamp"
          content="Pass a timestamp here to convert it to a date-time string in the time-zone selected above."
        />
      ),
      []
    ),
    onRenderDescription: React.useCallback(
      () => (
        <Text variant="medium" styles={styles}>
          {description}
        </Text>
      ),
      [description, styles]
    ),
  }
}

const useCopyTextField = (args = {}) => {
  const { value = '', onClick = () => null } = args
  return {
    value,
    primary: true,
    style: { border: '2px lightgray dashed' },
    iconProps: { iconName: 'Copy' },
    label: 'Timestamp',
    readOnly: true,
    onClick,
    onRenderLabel: React.useCallback(
      ({ label, id }) => (
        <CustomLabel
          label="Timestamp"
          content="A timestamp generated with the date, time and time-zone configured in the above fields."
        />
      ),
      []
    ),
  }
}

const setInLocalStorage = ({ key, value }) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(e)
  }
}

const deleteLocalStorageKey = (key) => {
  try {
    delete window.localStorage[key]
  } catch (e) {
    console.log('Did not  delete  local-storage-key', e)
  }
}

const getFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
  } catch (e) {
    console.error(e)
  }
}

const LOCAL_STORAGE_KEYS = {
  recentOptions: 'appsparkler-time-tool--recentOptions',
  timezoneKey: 'appsparkler-time-tool--timezoneKey',
}

const useTimeField = (args = {}) => {
  const { value, onChange } = args

  const [state, setState] = React.useState({
    errorMessage: '',
  })

  return {
    ...state,
    value,
    onChange: React.useCallback(
      (evt, time) => {
        const isValidValue = moment(time, 'HH:mm').isValid()
        setState((currentState) => ({
          ...currentState,
          errorMessage: isValidValue ? null : 'Time is  incorrect',
        }))
        onChange(evt, time)
      },
      [onChange]
    ),
    onFocus: React.useCallback((evt) => {
      evt.target.select()
      evt.target.select(0, 99999)
    }, []),
  }
}

const useTimezoneDropdown = (args = {}) => {
  const { onChange, selectedKey } = args

  const [state, setState] = React.useState({
    recentOptions: [],
    options: [],
    timezoneOptions: moment.tz.names().map((tz) => ({
      key: tz,
      text: tz,
    })),
  })

  // On mount, get-recent-items-from-local-storage
  React.useEffect(() => {
    const recentOptions = getFromLocalStorage(LOCAL_STORAGE_KEYS.recentOptions)
    if (Array.isArray(recentOptions) && recentOptions.length) {
      setState((currentState) => ({
        ...currentState,
        recentOptions,
      }))
    }
  }, [])

  // selected-key effects -  updated local-storage
  React.useEffect(() => {
    if (selectedKey) {
      setInLocalStorage({
        key: LOCAL_STORAGE_KEYS.timezoneKey,
        value: selectedKey,
      })
    }
  }, [selectedKey])

  // on change in recent-options
  React.useEffect(() => {
    const hasRecentOptions = state.recentOptions.length
    if (!hasRecentOptions) {
      setState((currentState) => ({
        ...currentState,
        options: [...currentState.timezoneOptions],
      }))
    } else {
      setState((currentState) => {
        setInLocalStorage({
          key: LOCAL_STORAGE_KEYS.recentOptions,
          value: currentState.recentOptions,
        })
        const timezoneOptionsWithoutRecent = currentState.timezoneOptions.filter(
          (timezoneOption) => {
            const isInRecentOptions = currentState.recentOptions.some(
              (recentOption) => recentOption.key === timezoneOption.key
            )
            return !isInRecentOptions
          }
        )
        const options = [
          {
            key: 'recentHeader',
            text: 'Recent',
            itemType: DropdownMenuItemType.Header,
          },
          ...currentState.recentOptions,
          {
            key: 'allTimezonesHeader',
            text: 'All Timezones',
            itemType: DropdownMenuItemType.Header,
          },
          ...timezoneOptionsWithoutRecent,
        ]
        return {
          ...currentState,
          options,
        }
      })
    }
  }, [state.recentOptions])

  return {
    options: state.options,
    selectedKey,
    onChange: React.useCallback(
      (...args) => {
        const [, selectedOption] = args
        setState((currentState) => {
          const recentOptions = _uniq([
            selectedOption,
            ...currentState.recentOptions,
          ])
          return {
            ...currentState,
            recentOptions,
          }
        })
        onChange(...args)
      },
      [onChange]
    ),
  }
}

const useDateTimeForm = (args) => {
  const {
    date,
    time,
    timezoneKey,
    onSelectDate,
    onChangeTime,
    onChangeTimezone,
    onChangeIsEndOfTimeCheckbox,
    isEndOfTime,
  } = args

  const dateTimeForm = {
    timeField: useTimeField({
      value: time,
      onChange: onChangeTime,
    }),
    dateField: {
      value: date,
      onSelectDate,
    },
    endOfTimeCheckbox: {
      value: isEndOfTime,
      onChange: onChangeIsEndOfTimeCheckbox,
    },
    timezoneDropdown: useTimezoneDropdown({
      onChange: onChangeTimezone,
      selectedKey: timezoneKey,
    }),
  }

  return dateTimeForm
}

function App() {
  const [state, setState] = React.useState({
    date: moment().toDate(),
    time: moment().format('HH:mm'),
    dateTime: '',
    isEndOfTime: false,
    showMessageBar: false,
    timeoutId: null,
    timezoneKey: null,
    timestamp: null,
  })

  const copyTextField = useCopyTextField({
    value: state.dateTime || '',
    onClick: React.useCallback(
      (evt) => {
        clearTimeout(state.timeoutId)
        const inputElem = evt.target
        inputElem.select()
        inputElem.setSelectionRange(0, 99999)
        document.execCommand('copy')
        const timeoutId = setTimeout(() => {
          setState((currentState) => ({
            ...currentState,
            showMessageBar: false,
          }))
        }, 2000)
        setState((currentState) => ({
          ...currentState,
          showMessageBar: true,
          timeoutId,
        }))
      },
      [state.timeoutId]
    ),
  })

  const dateTimeForm = useDateTimeForm({
    date: state.date,
    time: state.time,
    timezoneKey: state.timezoneKey,
    isEndOfTime: state.isEndOfTime,
    onSelectDate: React.useCallback((selectedDate) => {
      setState((currentState) => ({
        ...currentState,
        date: selectedDate,
      }))
    }, []),
    onChangeTime: React.useCallback((evt, time) => {
      setState((currentState) => ({
        ...currentState,
        time,
      }))
    }, []),
    onChangeIsEndOfTimeCheckbox: React.useCallback((evt, isEndOfTime) => {
      setState((currentState) => ({
        ...currentState,
        isEndOfTime,
      }))
    }, []),
    onChangeTimezone: React.useCallback((evt, selectedOption) => {
      const timezone = selectedOption.key
      setState((currentState) => ({
        ...currentState,
        timezone,
        timezoneKey: selectedOption.key,
      }))
    }, []),
  })

  const timestampTextField = useTimestampTextField({
    value: state.timestamp || '',
    description: `${state.dateTimeString} (${state.timezoneKey})`,
    onRenderDescription: () => {
      alert('rendering description...')
    },
    onChange: React.useCallback((evt, val) => {
      const updatedValMoment = moment(Number(val))
      if (updatedValMoment.isValid()) {
        setState((currentState) => ({
          ...currentState,
          timestamp: val,
        }))
      }
    }, []),
  })

  const onClickClearStorage = React.useCallback(() => {
    deleteLocalStorageKey(LOCAL_STORAGE_KEYS.timezoneKey)
    deleteLocalStorageKey(LOCAL_STORAGE_KEYS.recentOptions)
  }, [])

  // On mount effects - load timezones, set-initial-timezone-key
  React.useEffect(() => {
    moment.tz.load(TIMEZONE_JSON)
    const timezoneKey = getFromLocalStorage(LOCAL_STORAGE_KEYS.timezoneKey)
    if (timezoneKey) {
      setState((currentState) => ({
        ...currentState,
        timezoneKey,
      }))
    } else {
      const timezoneKey = moment.tz.guess(true)
      setState((currentState) => ({
        ...currentState,
        timezoneKey,
      }))
    }
  }, [])

  // Effects when values on the time-tool form are updated
  React.useEffect(() => {
    const dateString = moment(state.date).format('YYYY-MM-DD')
    const isValidTime = moment(state.time, 'HH:mm').isValid()
    if (isValidTime) {
      const dateTimeString = `${dateString} ${state.time}`
      const sanitizedDateTimeString = dateTimeString.replace(/_/g, '0')
      let dateTimeMoment = moment(sanitizedDateTimeString)
      if (state.timezoneKey) {
        dateTimeMoment = dateTimeMoment.tz(state.timezoneKey, true)
      }
      if (state.isEndOfTime) {
        dateTimeMoment = dateTimeMoment.subtract(1, 'ms')
      }
      const isValid = dateTimeMoment.isValid()
      const dateTime = dateTimeMoment.valueOf()
      setState((currentState) => ({
        ...currentState,
        dateTime: isValid ? dateTime : 'Date or time is not valid...',
      }))
    }
  }, [state.date, state.time, state.isEndOfTime, state.timezoneKey])

  React.useEffect(() => {
    let dateTimeMoment = moment(Number(state.timestamp))
    if (state.timezoneKey) {
      dateTimeMoment = dateTimeMoment.tz(state.timezoneKey)
    }
    let dateTimeString = dateTimeMoment.toString()
    setState((currentState) => ({
      ...currentState,
      dateTimeString,
    }))
  }, [state.timestamp, state.timezoneKey])

  return (
    <div>
      <ShowHide show={state.showMessageBar}>
        <Layer>
          <MessageBar messageBarType={MessageBarType.success}>
            Copied to clipboard.
          </MessageBar>
        </Layer>
      </ShowHide>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-col ms-lg2 ms-xl4"></div>
        <div
          className="
            ms-Grid-col
            ms-sm12 ms-lg8 ms-xl4 ms-depth-16
            ms-bgColor-gray10
          "
        >
          <Stack tokens={{ childrenGap: 10, padding: 10 }}>
            <Text variant="xxLarge">Time Tool</Text>
            <Text>
              1. Convert date & time for any timezone into a timestamp.
            </Text>
            <DateTimeForm {...dateTimeForm} />
            <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 10 }}>
              <Stack.Item>
                <TextField {...copyTextField} />
              </Stack.Item>
              <Stack.Item>
                <DefaultButton
                  iconProps={{ iconName: 'Trash' }}
                  onClick={onClickClearStorage}
                  text="Clear Local Storage"
                />
              </Stack.Item>
            </Stack>
            <Stack.Item>
              <Text>
                2. Convert a timestamp to date in the time-zone selected above.
              </Text>
            </Stack.Item>
            <Stack.Item>
              <TextField {...timestampTextField} />
            </Stack.Item>
          </Stack>
          <div className="ms-Grid-col ms-lg2 ms-xl4"></div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(App)
