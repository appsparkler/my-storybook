import React from 'react'
import PunchCard  from '../'
import {
  SelectionMode, MaskedTextField,
  PrimaryButton, TooltipHost, Label, Stack, Text,
  Panel, IconButton, DefaultButton, Icon
} from '@fluentui/react'
import CustomLabel from '../../../components/CustomLabel/variantA'
import SimpleForm from '../../../components/SimpleForm'
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import moment from 'moment'
import {v4 as uuid} from 'uuid'
import {
  reducePunchedSlotsToGoalAccomplished, verifyNewInTime,
  verifyNewOutTime
} from './utils'
import db from '../../../db';

const PunchCards = ({punchCards}) => Array.isArray(punchCards) && punchCards.map(({id, title, onClickEdit, onClickDelete}) => (
  <Stack
    horizontal
    verticalAlign="center"
    key={id}
    tokens={{childrenGap: 5}}
  >
    <IconButton
      iconProps={{iconName: 'Trash'}}
      onClick={onClickDelete}
    />
    <PrimaryButton
      iconProps={{iconName: 'Edit'}}
      text={title}
      onClick={onClickEdit}
    />
  </Stack>
))

const PunchCardStory =  {
  component: PunchCard,
  title: 'Apps/Punch Card'
}

export default PunchCardStory

const classNames = mergeStyleSets({
  wrapperStack: {
    maxWidth: 320,
    outline: '1px blue solid',
  },
  infoBar: {
    width: 180
  },
  detailsListColumn: {
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
    '.ms-DetailsList-contentWrapper .ms-FocusZone': {
      width: '100%',
      '.ms-DetailsRow-fields': {
        width: '100%'
      }
    },
    '.ms-DetailsHeader-cell': {
      width: '50% !important'
    }
  },
  punchOutIcon: {
    transform: 'rotate(180deg)'
  },
  timeInput: {
    width: 85
  },
})

const PunchInTimeCell = ({
  punchInTimeCell
}) => <TooltipHost content="Format: YYYY-MM-DD HH:mm">
  <MaskedTextField
    {...punchInTimeCell}
  />
</TooltipHost>

const PunchOutTimeCell = ({
  punchOutTimeCell, punchOutButton
}) => {
  if(punchOutTimeCell.value) {
    return <MaskedTextField
      {...punchOutTimeCell}
      />
    }
    return (<PunchOutButton
      {...punchOutButton}
    />)
}

const Template = (args) => <PunchCard {...args} />
Template.args = {
  wrapperStack: {
    className: classNames.wrapperStack
  },
  messageBar: {
    children: '128 mins 2 go...',
    className: classNames.infoBar
  },
  goalHours: {
    label: 'Hours',
    content: 'hours!!!',
    type: 'number',
    className: classNames.timeInput,
    value: '09',
    onRenderLabel: (props) => <CustomLabel {...props} />
  },
  goalMinutes: {
    label: 'Minutes',
    content: 'minutes!!!',
    type: 'number',
    value: '00',
    className: classNames.timeInput,
    onRenderLabel: (props) => <CustomLabel {...props} />
  },
  primaryButton: {},
  primaryButton1: {
    text: 'Punch In',
    disabled: true,
    iconProps: {
      iconName: 'Leave'
    }
  },
  detailsList: {
    className: classNames.detailsList,
    selectionMode: SelectionMode.none,
    items: [
      {"index":0,"id":"4ba31d01-f573-4e29-a3a6-a5a3abd5d07c","inTime":1606472521685,"outTime":1606473795996,"punchInTimeCell":{"value":"2020-11-27 15:52","mask":"9999-99-99 99:99"},"punchOutTimeCell":{"value":"2020-11-27 16:13","mask":"9999-99-99 99:99"},"punchOutButton":{"text":"Punch Out","iconProps":{"iconName":"Leave","className":"punchOutIcon-43"}}},
      {"index":1,"id":"dfef9bb5-f731-407b-9455-40eb00aade93","inTime":1606475327823,"outTime":null,"punchInTimeCell":{"value":"2020-11-27 16:38","mask":"9999-99-99 99:99"},"punchOutTimeCell":{"value":null,"mask":"9999-99-99 99:99"},"punchOutButton":{"text":"Punch Out","iconProps":{"iconName":"Leave","className":"punchOutIcon-43"}}}
    ],
    columns: [
      {
        id: '1243',
        key: 'punch-in-time',
        name: 'In Time',
        fieldName: 'punchInTime',
        className: classNames.detailsListColumn,
        isResizable: false,
        onRender: PunchInTimeCell
      },
      {
        id: '1233',
        key: 'punch-out-time',
        name: 'Out Time',
        fieldName: 'punchOutTime',
        className: classNames.detailsListColumn,
        isResizable: false,
        onRender: PunchOutTimeCell
      }
    ],
  },
  progressIndicator1: {
    barHeight: 10,
    percentComplete: 20/100,
    label: 'Punched',
    dir: 'ltr'
  },
  progressIndicator2: {
    barHeight: 10,
    percentComplete: 20/100,
  },
  title: "My Punch Card",
  showPunchedSection: true,
  tooltipHost1: {},
  punchCardDialog: {},
  showPunchCard: true
}

export const SmallMobile = Template.bind({})
SmallMobile.args = {
  ...Template.args
}
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const LargeMobile = Template.bind({})
LargeMobile.args =  {
  ...Template.args
}
LargeMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2'
  }
}

export const Tablet = Template.bind({})
Tablet.args =  {
  ...Template.args
}
Tablet.parameters = {
  viewport: {
    defaultViewport: 'tablet'
  }
}

export const Desktop = Template.bind({})
Desktop.args = {
  ...Template.args
}

const TooltipHostContent = ({punchedTime, timeLeft}) => (
  <Stack vertical>

    <Stack.Item>
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{childrenGap: 10}}
      >
        <Label>Time Punched: </Label>
        <Text>{punchedTime} mins</Text>
      </Stack>
    </Stack.Item>

    <Stack.Item>
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{childrenGap: 10}}
      >
        <Label>Time Left: </Label>
        <Text>{timeLeft} mins</Text>
      </Stack>
    </Stack.Item>

  </Stack>
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

const selectTimeInInputField = (elem, startPos, endPos) => {
  elem.selectionStart = 11
  elem.selectionEnd = 16
}

class PunchCardClass {
  constructor(config = {}) {
    const {
      id = '',
      goalForTheDay = {
        hours: '09',
        minutes: '00'
      },
      slots = []
    } = config
    this.id = id;
    this.goalForTheDay = goalForTheDay;
    this.slots = slots;
  }
}

const useDetailsList = (args = {}) => {
  const {
    editPunchedSlot = () => null,
    onPunchOut = () => null,
    items = []
  } = args;

  const [state, setState] =  React.useState({
    modifiedItems: []
  });

  const setPunchedInCellError = React
    .useCallback((item) => {
      setState(currentState => {
        return {
          ...currentState,
          modifiedItems: currentState.modifiedItems
            .map(modifiedItem => (modifiedItem.id === item.id) ? ({
              ...modifiedItem,
              punchInTimeCell: {
                ...modifiedItem.punchInTimeCell,
                errorMessage: item.errorMessage
              }
            }): modifiedItem)
        }
      })
    },[])

  const setPunchedOutCellError = React
    .useCallback((item) => {
      setState(currentState => {
        return {
          ...currentState,
          modifiedItems: currentState.modifiedItems
            .map(modifiedItem => (modifiedItem.id === item.id) ? ({
              ...modifiedItem,
              punchOutTimeCell: {
                ...modifiedItem.punchOutTimeCell,
                errorMessage: item.errorMessage
              }
            }): modifiedItem)
        }
      })
    },[])

  React.useEffect(() => {
    setState(currentState => {
      const modifiedItems  = items
        .map((item, index) => ({
          index,
          ...item,
          punchInTimeCell: {
            value: moment(item.inTime).format('YYYY-MM-DD HH:mm'),
            mask: '9999-99-99 99:99',
            onClick: (evt) => {
              selectTimeInInputField(evt.target)
            },
            errorMessage: item.outTimeErrorMessage,
            onChange: (evt, newInTime) => {
              const isDone = !newInTime.match(/_/)
              if(isDone) {
                const newInTimeValidity = verifyNewInTime({
                  newInTime,
                  slots: modifiedItems,
                  item: modifiedItems[index]
                })
                if(!newInTimeValidity.isValid) {
                  return setPunchedInCellError({
                    id: item.id,
                    errorMessage: newInTimeValidity.errorMessage
                  })
                } else {
                  setPunchedInCellError({
                    id: item.id,
                    errorMessage: ''
                  })
                  const inTime = moment(newInTime, 'YYYY-MM-DD HH:mm')
                      .valueOf()
                  editPunchedSlot({
                    id: item.id,
                    inTime
                  })
                }
              }
            }
          },
          punchOutTimeCell: {
            value: item.outTime ?
              moment(item.outTime).format('YYYY-MM-DD HH:mm')
              : item.outTime,
            mask: '9999-99-99 99:99',
            onClick: (evt) => {
              selectTimeInInputField(evt.target)
            },
            errorMessage: item.inTimeErrorMessage,
            onChange: (evt, newOutTime) => {
              const isDone = !newOutTime.match(/_/);
              if(isDone) {
                const outTimeValidity = verifyNewOutTime({
                  newOutTime,
                  modifiedItems,
                  id: item.id
                })
                if(!outTimeValidity.isValid) {
                  setPunchedOutCellError({
                    id: item.id,
                    errorMessage: outTimeValidity.errorMessage
                  })
                } else {
                  setPunchedOutCellError({
                    id: item.id,
                    errorMessage: ''
                  })
                  const outTime = moment(newOutTime, 'YYYY-MM-DD HH:mm')
                      .valueOf()
                  editPunchedSlot({
                    id: item.id,
                    outTime
                  })
                }
              }
            }
          },
          punchOutButton: {
            onClick: () => {
              const {inTime} = item
              let outTime = moment().valueOf();
              const isOutTimeLessThanInTime = outTime < inTime;
              if(isOutTimeLessThanInTime) {
                outTime = inTime
              }
              editPunchedSlot({
                id: item.id,
                outTime
              })
            },
            text: 'Punch Out',
            iconProps: {
              iconName: 'Leave',
              className: classNames.punchOutIcon
            },
          }
        }))
      return {
        ...currentState,
        modifiedItems
      }
    })
  },[
    items, onPunchOut,
    setPunchedInCellError, setPunchedOutCellError,
    editPunchedSlot
  ])

  return {
    className: classNames.detailsList,
    selectionMode: SelectionMode.none,
    items: state.modifiedItems,
    columns: [
      {
        id: '1243',
        key: 'punch-in-time',
        name: 'In Time',
        fieldName: 'punchInTime',
        className: classNames.detailsListColumn,
        isResizable: false,
        onRender: PunchInTimeCell
      },
      {
        id: '1233',
        key: 'punch-out-time',
        name: 'Out Time',
        fieldName: 'punchOutTime',
        className: classNames.detailsListColumn,
        isResizable: false,
        onRender: PunchOutTimeCell
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
    className: classNames.timeInput,
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

const usePrimaryButton1 = (args = {}) => {
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

const useTooltipHost1 = (args = {}) => {
  const {
    punchedTime = '',
    timeLeft = ''
  } = args;
  return {
    content: <TooltipHostContent
      punchedTime={punchedTime}
      timeLeft={timeLeft}
    />
  }
}

const usePunchCardApp = (args = {}) => {
  const {
    currentPunchCard = null,
    onChangePunchCard = () => null
  } = args;

  const [state, setState] = React.useState({
    id: null,
    title: '',
    goalForTheDay: {
      hours: '09',
      minutes: '00'
    },
    slots: [],
    isPunchInButtonDisabled: false,
    goalAccomplished: 0,
    goalInMinutes: 0
  })

  const updateGoalForTheDay = React.useCallback((update) => {
    const goalForTheDay = {
      ...state.goalForTheDay,
      ...update
    }
    setState(currentState => ({
      ...currentState,
      goalForTheDay
    }))
  }, [state.goalForTheDay])

  const updateGoalMinutes = React.useCallback((minutes) => {
    setState(currentState => ({
      ...currentState,
      goalForTheDay: {
        ...currentState.goalForTheDay,
        minutes
      }
    }))
  },[])

  const addPunchedSlot = React.useCallback((slot) => {
    setState(currentState => ({
      ...currentState,
      slots: [
        ...currentState.slots,
        slot
      ]
    }))
  }, [])

  const updatePunchedSlot = React.useCallback(slot => {
    setState(currentState => {
      const filteredSlots = currentState.slots.filter(
        item => item.id !== slot.id
      );
      return {
        ...currentState,
        slots: [
          ...filteredSlots,
          slot
        ]
      }
    })
  },[])

  const editPunchedSlot = React.useCallback((slot) => {
    setState(currentState => ({
      ...currentState,
      slots:[
        ...currentState
          .slots
          .map(stateSlot => slot.id === stateSlot.id ?
            ({
              ...stateSlot,
              ...slot
            }) : stateSlot)
      ]
    }))
  }, []);

  const updateIsPunchInButtonDisabled = React
    .useCallback((isPunchInButtonDisabled) => {
      setState(currentState =>  ({
        ...currentState,
        isPunchInButtonDisabled
      }))
    },[])

  const {id, goalForTheDay, slots} = state;

  React.useEffect(() => {
    if(id) {
      db.punchCards.update(
        id,
        {goalForTheDay}
      )
    }
  },[id, goalForTheDay])


  React.useEffect(() => {
    if(id) {
      db.punchCards.update(
        id,
        {slots}
      )
    }
  },[id, slots])

  React.useEffect(() => {
    const { hours, minutes } = state.goalForTheDay
    const hoursInMinutes =  Number(hours, 10) * 60;
    const goalInMinutes = hoursInMinutes  + Number(minutes);
    const goalAccomplished = state.slots
      .reduce(reducePunchedSlotsToGoalAccomplished, 0)
    setState(currentState => ({
      ...currentState,
      goalAccomplished,
      goalInMinutes
    }))
  }, [state.goalForTheDay, state.slots])

  React.useEffect(() =>  {
    const isPunchInButtonDisabled = !!state.slots
      .filter(({inTime, outTime}) => !outTime)
      .length
    updateIsPunchInButtonDisabled(isPunchInButtonDisabled)
  }, [state.slots, updateIsPunchInButtonDisabled])

  React.useEffect(() => {
    let minutes;
    const is24 = state.goalForTheDay.hours === 24;
    if(is24) {
      minutes = '00'
    }
    updateGoalMinutes({minutes})
  }, [state.goalForTheDay.hours, updateGoalMinutes])

  React.useEffect(() => {
    if(typeof currentPunchCard === 'object') {
      setState(currentState => ({
        ...currentState,
        ...currentPunchCard
      }))
    }
  }, [currentPunchCard])

  React.useEffect(() => {
    const punchCard = new PunchCardClass(state);
    onChangePunchCard(punchCard)
  },[state, onChangePunchCard])

  return {
    title: state.title,
    detailsList: useDetailsList({
      onPunchIn: addPunchedSlot,
      onPunchOut: updatePunchedSlot,
      items: state.slots,
      editPunchedSlot
    }),
    goalHours: useGoalHours({
      value: state.goalForTheDay.hours,
      onChange: updateGoalForTheDay,
    }),
    goalMinutes: useGoalMinutes({
      value: state.goalForTheDay.minutes,
      disabled: React.useMemo(
        () => Number(state.goalForTheDay.hours) === 24,
        [state.goalForTheDay.hours]
      ),
      onChange: React.useCallback((minutes) =>  {
        const is24Hours  = Number(state.goalForTheDay.hours) ===  24
        if(!is24Hours) {
          updateGoalForTheDay({minutes})
        }
      },[state.goalForTheDay.hours,  updateGoalForTheDay])
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
      onClick: addPunchedSlot,
      disabled: state.isPunchInButtonDisabled,
      numberOfSlots: state.slots.length
    }),
    messageBar: {
      className: classNames.infoBar,
      children: React.useMemo(() => {
        const {goalAccomplished, goalInMinutes} = state
        const minutes2Go = goalInMinutes - goalAccomplished
        return `${minutes2Go} minutes to go...`
      },[state])
    },
    showPunchedSection: React.useMemo(
      () => Boolean(state.slots.length),
      [state.slots.length]
    ),
    tooltipHost1: useTooltipHost1({
      punchedTime: state.goalAccomplished,
      timeLeft:state.goalInMinutes - state.goalAccomplished
    }),
    showPunchCard: Boolean(currentPunchCard)
  }
}

export const App = () => {

  const [state, setState] = React.useState({
    currentPunchCard: null,
    isPanelOpen: false,
    dbPunchCards: [],
    punchCards: [],
    punchCardForm: {
      title: ''
    }
  });

  const updateCurrentPunchCard = React.useCallback((punchCard) => {
    setState((currentState) => ({
      ...currentState,
      currentPunchCard: punchCard
    }))
  },[])

  const updatePunchCard = React.useCallback((punchCard) => {
    // setState(currentState => ({
    //   ...currentState,
    //   dbPunchCards: currentState
    //     .dbPunchCards
    //     .map(statePunchCard => statePunchCard.id === punchCard.id ? ({
    //       ...statePunchCard,
    //       ...punchCard
    //     }) : statePunchCard)
    // }))
  }, [])

  const deletePunchCard = React.useCallback(async (punchCard) => {
    await db.punchCards.delete(punchCard.id);
    setState(currentState => ({
      ...currentState,
      currentPunchCard: currentState.currentPunchCard && punchCard.id === currentState.currentPunchCard.id ? null : currentState.currentPunchCard,
      dbPunchCards: currentState
        .dbPunchCards
        .filter(dbPunchCard => dbPunchCard.id !== punchCard.id)
    }))
  },[])

  const punchCardApp = usePunchCardApp({
    currentPunchCard: state.currentPunchCard,
    onChangePunchCard: updatePunchCard
  })

  const panel = {
    headerText: "Punch Cards",
    isOpen: state.isPanelOpen,
    onDismiss: React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        isPanelOpen: false
      }))
    }, []),
    // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
    closeButtonAriaLabel: "Close"
  }

  const openPaneButton = {
    text: 'Show Punch Cards',
    className:"ms-hiddenMdUp",
    onClick: React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        isPanelOpen: true
      }))
    },[]),
    disabled: !state.punchCards.length,
    iconProps: {
      iconName: 'OpenPane'
    }
  }

  const simpleForm = {
    onSubmit: React.useCallback(async  (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      const { title } = state.punchCardForm;
      if(!title) return false;
      const punchCard =  {
        id: uuid(),
        title,
        createdOn: Date.now(),
        goalForTheDay: {
          hours: '09',
          minutes: '00'
        },
        slots: []
      }
      await db.punchCards.add(punchCard)
      setState(currentState => ({
        ...currentState,
        punchCardTitle: '',
        dbPunchCards: [punchCard, ...currentState.dbPunchCards],
        punchCardForm: {
          title: ''
        }
      }))
    },[
      state.punchCardForm
    ]),
    placeholder:"Punch Card Title...",
    submitButtonText: 'Add Punch Card',
    fieldValue: state.punchCardForm.title,
    onChangeField: React.useCallback((evt, title) => {
      setState((currentState) =>( {
        ...currentState,
        punchCardForm: {
          ...currentState.punchCardForm,
          title
        }
      }))
    },[]),
    disabled: React.useMemo(
      () => !state.punchCardForm.title.trim(),
      [state.punchCardForm.title]
    )
  }

  React.useEffect(() => {
    db.punchCards
      .toCollection()
      .toArray()
      .then((dbPunchCards) => {
        setState(currentState => ({
          ...currentState,
          dbPunchCards
        }))
      });
  },[])

  React.useEffect(() => {
    setState(currentState => ({
      ...currentState,
      isPanelOpen: Boolean(state.punchCards.length)
    }))
  },[state.punchCards.length])

  React.useEffect(() => {
    const punchCards = state.dbPunchCards.map(punchCard => ({
      ...punchCard,
      onClickEdit: () => {
        updateCurrentPunchCard(punchCard);
        setState(currentState => ({
          ...currentState,
          isPanelOpen: false
        }))
      },
      onClickDelete: () => deletePunchCard(punchCard)
    }))
    setState(currentState => ({
      ...currentState,
      punchCards
    }))
  }, [state.dbPunchCards, deletePunchCard, updateCurrentPunchCard])

  return (
    <div>
      <Stack horizontal tokens={{childrenGap: 10}}>
        <Stack.Item>
          <SimpleForm {...simpleForm} />
        </Stack.Item>
        <Stack.Item>
          <IconButton {...openPaneButton} />
          <DefaultButton {...openPaneButton}
            className="ms-hiddenSm"
          />
        </Stack.Item>
      </Stack>

      <PunchCard
        {...punchCardApp}
      />

      <Panel
        {...panel}
      >
        <Stack vertical tokens={{childrenGap: 5}}>
          <PunchCards
            punchCards={state.punchCards}
          />
        </Stack>
      </Panel>
    </div>
  )
}
