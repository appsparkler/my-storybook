import React from 'react'
import PunchCard  from '../'
import {
  TextField, SelectionMode,
   PrimaryButton
} from '@fluentui/react'
import CustomLabel from '../../CustomLabel/variantA'
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import moment from 'moment'
import {v4 as uuid} from 'uuid'

const PunchCardStory =  {
  component: PunchCard,
  title: 'Components/Punch Card'
}

export default PunchCardStory

const classNames = mergeStyleSets({
  test: {
    width: '50% !important',
    '.ms-FocusZone': {
      outline: '1px blue solid'
    },
    '.ms-DetailsHeader-cell': {
      width: '50%',
      outline: '1px blue solid'
    }
  },
  detailsList: {
    '.ms-DetailsHeader-cell': {
      width: '50% !important'
    }
  }
})

const PunchInButton = (props) => (
  <PrimaryButton
    iconProps={{
      iconName: 'Leave',
    }}
    text='Punch In'
    {...props}
  />
)

const PunchOutButton = (props) => (
  <PrimaryButton
    iconProps={{
      iconName: 'Leave',
      styles: {
        root: {
          transform: 'rotate(180deg)'
        }
      }
    }}
    text='Punch Out'
    {...props}
  />
)

const Template = (args) => <PunchCard {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'My Punch Card',
  primaryButton: {
    text: 'Punch Out',
    iconProps: {
      iconName: 'Leave',
      styles: {
        root: {
          transform: 'rotate(180deg)'
        }
      }
    }
  },
  primaryButton1: {
    text: 'Add Scheduled Slot',
    iconProps: {
      iconName: 'Clock'
    }
  },
  detailsList: {
    className: classNames.detailsList,
    selectionMode: SelectionMode.none,
    styles: {
      root: {
        '.ms-DetailsList-contentWrapper .ms-FocusZone': {
          width: '100%',
          '.ms-DetailsRow-fields': {
            width: '100%'
          }
        }
      }
    },
    items: [
      {
        id: '1234',
        punchInTime: '06:00',
        punchOutTime: '06:40',
      },
      {
        punchInTime: null,
        punchOutTime: null,
      }
    ],
    columns: [
      {
        id: '1243',
        key: 'punch-in-time',
        name: 'In Time',
        fieldName: 'punchInTime',
        className: classNames.test,
        isResizable: false,
        onRender: ({punchInTime}) => {
          if(punchInTime) {
            return <TextField
              value={punchInTime}
              />
          } else {
            return <PunchInButton />
          }
        }
      },
      {
        id: '1233',
        key: 'punch-out-time',
        name: 'Out Time',
        fieldName: 'punchOutTime',
        className: classNames.test,
        isResizable: false,
        onRender: ({punchInTime, punchOutTime}) => {
        if(punchInTime && punchOutTime) {
          return <TextField
            value={punchOutTime}
            />
        } else if(!punchInTime) {
          return <PunchOutButton disabled />
        } else {
          return <PunchOutButton />
        }
      }
      }
    ],
  },
  goalHours: {
    label: 'Hours',
    value: 12,
    styles: {
      root: {
        width: 70
      }
    },
    type: 'number',
    min: 0,
    max: 24,
  },
  goalMinutes: {
    label: 'Minutes',
    value: 32,
    styles: {
      root: {
        width: 70
      }
    },
    type: 'number',
    min: 0,
    max: 59,
  },
  progressIndicator1: {
    label:"Punched",
    percentComplete: .4,
    barHeight: 20,
  },
  progressIndicator2: {
    label:"Scheduled",
    percentComplete: .2,
    barHeight: 20,
  }
}

const useDetailsList = (args = {}) => {
  const {
    onPunchIn = () => null,
    items = []
  } = args;

  return {
    className: classNames.detailsList,
    selectionMode: SelectionMode.none,
    styles: {
      root: {
        '.ms-DetailsList-contentWrapper .ms-FocusZone': {
          width: '100%',
          '.ms-DetailsRow-fields': {
            width: '100%'
          }
        }
      }
    },
    items,
    columns: [
      {
        id: '1243',
        key: 'punch-in-time',
        name: 'In Time',
        fieldName: 'punchInTime',
        className: classNames.test,
        isResizable: false,
        onRender: ({inTime}) => {
          if(inTime) {
            return <TextField
              value={inTime}
              />
          } else {
            return <PunchInButton
              onClick={onPunchIn}
            />
          }
        }
      },
      {
        id: '1233',
        key: 'punch-out-time',
        name: 'Out Time',
        fieldName: 'punchOutTime',
        className: classNames.test,
        isResizable: false,
        onRender: ({
          inTime, outTime
        }) => {
          if(inTime && outTime) {
            return <TextField
              value={outTime}
              />
            } else if(!inTime) {
              return <PunchOutButton disabled />
            } else {
              return <PunchOutButton />
            }
          }
      }
    ],
  }
}

const useGoalMinutes = (args = {}) => {
  const {
    onChange = () => null,
    value = '',
    disabled = false
  } = args
  return {
    label: 'Minutes',
    value,
    disabled,
    styles: {
      root: {
        width: 85
      }
    },
    type: 'number',
    min: 0,
    max: 59,
    onChange: React.useCallback((evt, val) => {
      const isValANumber = !isNaN(val);
      if(isValANumber) {
        const isValLessThanMin = val < Number(evt.target.min);
        const isValMoreThanMax = val > Number(evt.target.max);
        if(!isValLessThanMin && !isValMoreThanMax) {
          onChange(Number(val));
        }
      }
    }, [onChange]),
    onRenderLabel: React.useCallback(
      ({ label }) => <CustomLabel
        label={label}
        content="A value between 0  and 59."
      />,
      []
    ),
    onFocus: React.useCallback((evt) => {
      const elem = evt.target;
      elem.select();
      elem.select(0, 99999);
    },[])
  }
}

const useGoalHours = (args = {}) => {
  const {
    onChange = () => null,
    value = ''
  } = args
  return {
    label: 'Hours',
    value,
    styles: {
      root: {
        width: 85
      }
    },
    type: 'number',
    min: 0,
    max: 24,
    onChange: React.useCallback((evt, val) => {
      const isValANumber = !isNaN(val);
      if(isValANumber) {
        const isValLessThanMin = val < Number(evt.target.min);
        const isValMoreThanMax = val > Number(evt.target.max);
        if(!isValLessThanMin && !isValMoreThanMax) {
          onChange(Number(val));
        }
      }
    }, [onChange]),
    onRenderLabel: React.useCallback(
      ({ label }) => <CustomLabel
        label={label}
        content="A value between 0  and 24."
      />,
      []
    ),
    // TODO - Abstract out select functionality in a utils-module
    onFocus: React.useCallback((evt) => {
      const elem = evt.target;
      elem.select();
      elem.select(0, 99999);
    },[])
  }
}

const  usePrimaryButton1 = (args = {}) => {
  const {
    onClick = () => null,
    disabled = false
  } = args;

  return {
    onClick,
    disabled,
    text: 'Punch In',
    iconProps: {
      iconName: 'Leave',
    }
  }
}

const usePunchCardApp = (args = {}) => {
  const {
    goalForTheDay = {},
    punchedSlots =  [],
    onPunchIn = () => null,
    onChangeHours = () => null,
    onChangeMinutes = () => null,
  } = args;

  const [state, setState] = React.useState({
    isPunchInButtonDisabled: false
  })

  React.useEffect(() =>  {
    const isPunchInButtonDisabled = !!punchedSlots
      .filter(({inTime, outTime}) => !outTime)
      .length
    setState(currentState =>  ({
      ...currentState,
      isPunchInButtonDisabled
    }))
  }, [punchedSlots])

  return {
    detailsList: useDetailsList({
      onPunchIn,
      items: punchedSlots
    }),
    goalHours: useGoalHours({
      value: goalForTheDay.hours,
      onChange: onChangeHours,
    }),
    goalMinutes: useGoalMinutes({
      value: goalForTheDay.minutes,
      disabled: React.useMemo(
        () => Number(goalForTheDay.hours) === 24,
        [goalForTheDay.hours]
      ),
      onChange: React.useCallback((minutes) =>  {
        const is24Hours  = Number(goalForTheDay.hours) ===  24
        if(!is24Hours) {
          onChangeMinutes(minutes)
        }
      },[goalForTheDay.hours,  onChangeMinutes])
    }),
    progressIndicator1: {
      label:"Punched",
      percentComplete: .4,
      barHeight: 20,
    },
    progressIndicator2: {
      label:"Scheduled",
      percentComplete: .2,
      barHeight: 20,
    },
    primaryButton1: usePrimaryButton1({
      onClick: onPunchIn,
      disabled: state.isPunchInButtonDisabled
    })
  }
}

export const WithHook = () => {
  const [state, setState] = React.useState({
    goalForTheDay: {
      hours: '09',
      minutes: '00'
    },
    punchedSlots: []
  });

  const punchCardApp = usePunchCardApp({
    //
    goalForTheDay: state.goalForTheDay,
    onChangeMinutes: React.useCallback((minutes) => {
      setState(currentState => ({
        ...currentState,
        goalForTheDay: {
          ...currentState.goalForTheDay,
          minutes
        }
      }))
    },[]),
    onChangeHours: React.useCallback((hours) => {
      setState(currentState => ({
        ...currentState,
        goalForTheDay: {
          ...currentState.goalForTheDay,
          hours,
        }
      }))
    },[]),
    //
    punchedSlots: state.punchedSlots,
    onPunchIn: React.useCallback(() =>  {
      const inTime = moment().add(1,'minute').format('HH:mm');
      setState(currentState => ({
        ...currentState,
        punchedSlots: [
          ...currentState.punchedSlots, {
          id: uuid(),
          inTime,
          outTime: null
        }]
      }))
    }, []),
    onPunchOut:  React.useCallback(() => {
        
    },[])
  })

  React.useEffect(() => {
    // alert(JSON.stringify(state.punchedSlots, null, 2))
  },[state.punchedSlots])

  React.useEffect(() => {
    setState(currentState => {
      const is24 = state.goalForTheDay.hours === 24;
      const minutes =  is24 ? '00' : currentState.goalForTheDay.minutes;
      const goalForTheDay =  {
        ...currentState.goalForTheDay,
        minutes
      }
      return  {
        ...currentState,
        goalForTheDay
      }
    });
  }, [state.goalForTheDay.hours])

  return <PunchCard
    title="My Punch Card"
    {...punchCardApp}
  />
}
