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
import {reducePunchedSlotsToGoalAccomplished} from './utils'

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
  },
  messageBar: {
    children: '540 minutes to go...'
  }
}

const useDetailsList = (args = {}) => {
  const {
    onPunchIn = () => null,
    onPunchOut = () => null,
    items = []
  } = args;

  const [state, setState] =  React.useState({
    modifiedItems: []
  });

  React.useEffect(() => {
    setState(currentState => {
      const modifiedItems  = items
        .map(item => ({
          ...item,
          inTime: moment(item.inTime).format('HH:mm'),
          outTime:  item.outTime ? moment(item.outTime).format('HH:mm') :  item.outTime,
          onPunchOut: () => {
            let outTime = moment().valueOf();
            const isOutTimeLessThanInTime = outTime < item.inTime;
            if(isOutTimeLessThanInTime) {
              outTime = item.inTime
            }
            onPunchOut({
              ...item,
              outTime
            })
          }
        }))
      return {
        ...currentState,
        modifiedItems
      }
    })
  },[items, onPunchOut])

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
    items: state.modifiedItems,
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
          inTime, outTime, id,
          onPunchOut
        }) => {

          if(inTime && outTime) {
            return <TextField
              value={outTime}
              />
            } else if(!inTime) {
              return <PunchOutButton disabled />
            } else {
              return <PunchOutButton
                onClick={onPunchOut}
              />
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
          const hours = Number(val);
          onChange({hours});
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
    disabled = false,
    numberOfSlots = 0
  } = args;

  const [state, setState] = React.useState({
    text: 'Start Your Day'
  })

  React.useEffect(() => {
    let text = ''
    if(!numberOfSlots) {
      text = 'Start Your Day'
    } else {
      text = 'Punch In'
    }
    setState(currentState => ({
      ...currentState,
      text
    }))
  }, [numberOfSlots])

  return {
    onClick: React.useCallback(() =>  {
      const inTime = moment()
        .add(1, 'minute')
        .valueOf();
      const id = uuid();
      onClick({
        id,
        inTime,
        outTime: null
      })
    }, [onClick]),
    disabled,
    text: state.text,
    iconProps: {
      iconName: 'Leave',
    }
  }
}

const useProgressIndicator1 = (args = {}) => {
  const {
    percentComplete = 0
  } = args;

  return {
    label:"Punched",
    percentComplete,
    barHeight: 20,
  }
}

const usePunchCardApp = (args = {}) => {
  const {
    goalForTheDay = {},
    punchedSlots =  [],
    onPunchIn = () => null,
    onPunchOut = () => null,
    onChangeHours = () => null,
    onChangeMinutes = () => null,
  } = args;

  const [state, setState] = React.useState({
    isPunchInButtonDisabled: false,
    goalAccomplished: 0,
    goalInMinutes: 0
  })

  React.useEffect(() => {
    const { hours, minutes } = goalForTheDay
    const hoursInMinutes =  Number(hours, 10) * 60;
    const goalInMinutes = hoursInMinutes  + Number(minutes);
    const goalAccomplished = punchedSlots
      .reduce(reducePunchedSlotsToGoalAccomplished, 0)
    setState(currentState => ({
      ...currentState,
      goalAccomplished,
      goalInMinutes
    }))
  }, [goalForTheDay, punchedSlots])

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
      onPunchIn, onPunchOut,
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
          onChangeMinutes({minutes})
        }
      },[goalForTheDay.hours,  onChangeMinutes])
    }),
    progressIndicator1: useProgressIndicator1({
      percentComplete: (state.goalAccomplished/state.goalInMinutes)
    }),
    progressIndicator2: {
      label:"Scheduled",
      percentComplete: .2,
      barHeight: 20,
    },
    primaryButton1: usePrimaryButton1({
      onClick: onPunchIn,
      disabled: state.isPunchInButtonDisabled,
      numberOfSlots: punchedSlots.length
    }),
    messageBar: {
      styles: {root: {width: 180}},
      children: React.useMemo(() => {
        const {goalAccomplished, goalInMinutes} = state
        const minutes2Go = goalInMinutes - goalAccomplished
        return `${minutes2Go}  minutes to go...`
      },[state])
    }
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

  const updateGoalForTheDay = React.useCallback((goalForTheDay) => {
    setState(currentState => ({
      ...currentState,
      goalForTheDay: {
        ...currentState.goalForTheDay,
        ...goalForTheDay
      }
    }))
  }, [])

  const addPunchedSlot = React.useCallback((slot) => {
    setState(currentState => ({
      ...currentState,
      punchedSlots: [
        ...currentState.punchedSlots,
        slot
      ]
    }))
  }, [])

  const updatePunchedSlot = React.useCallback(slot => {
    setState(currentState => ({
      ...currentState,
      punchedSlots: [
        ...currentState.punchedSlots.filter(
          item => item.id !== slot.id
        ),
        slot
      ]
    }))
  },[])

  const punchCardApp = usePunchCardApp({
    goalForTheDay: state.goalForTheDay,
    onChangeMinutes: updateGoalForTheDay,
    onChangeHours: updateGoalForTheDay,
    punchedSlots: state.punchedSlots,
    onPunchIn: addPunchedSlot,
    onPunchOut: updatePunchedSlot
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
