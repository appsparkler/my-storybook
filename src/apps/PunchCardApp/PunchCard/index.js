import React from 'react';
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import moment from 'moment'
import { Stack, Text } from '@fluentui/react'
import PunchedProgress from './PunchedProgress'
import GoalForTheDayForm from './GoalForTheDayForm'
import PunchedSlots from './PunchedSlots'
import PunchCardButtons from './PunchCardButtons'
import AddScheduledSlotPanel from './AddScheduledSlotPanel'
import Spinner from './Spinner'
import {messages} from '../shared'
import ScheduledSlots from './ScheduledSlots'

const PunchCardLayout = ({
  show,
  text,
  goalForTheDayForm, punchedSlots,
  punchCardButtons, punchedProgress,
  addScheduledSlotPanel, spinner,
  scheduledSlots, scheduledProgress
}) => (
  show && <Stack vertical tokens={{childrenGap: 10}}>
    <Stack horizontal tokens={{childrenGap: 5}}>
      <Text {...text} /> <Spinner {...spinner} />
    </Stack>
    <AddScheduledSlotPanel {...addScheduledSlotPanel} />
    <GoalForTheDayForm {...goalForTheDayForm} />
    <PunchedSlots {...punchedSlots} />
    <PunchCardButtons {...punchCardButtons} />
    <ScheduledSlots {...scheduledSlots}/>
    <PunchedProgress {...punchedProgress} />
    <div dir="rtl">
      <PunchedProgress {...scheduledProgress} />
    </div>
  </Stack>
);

const {
  START_YOUR_DAY,  PUNCH_IN
} = messages;

export const getGoalInMinutes = (goalForTheDay = {}) => {
  const {
    hours = '00',
    minutes = '00'
  } = goalForTheDay;
  const goaInMinutes = (Number(hours) * 60) + Number(minutes)
  return goaInMinutes;
}

export const getMinutesFromSlots = ({slots}) => {
  if(!slots.length) return 0;
  const minutes = slots
    .reduce((loop, {inTime, outTime}) => {
      if(!inTime || !outTime) {
        return loop
      }
      const minutesDiff = moment(outTime).diff(inTime, 'minutes')
      return minutesDiff + loop
    }, 0)
  return minutes;
}

export const enablePunchInButton = ({items}) => {
  if(!items.length) return true;
  const lastIndex = items.length - 1;
  const show = items[lastIndex].outTime;
  return Boolean(show);
}

export const getPercentComplete = ({items}) => {
  return 0.2;
}

export const getPunchInButtonText = (numberOfItems) => Boolean(numberOfItems) ? PUNCH_IN : START_YOUR_DAY;

/**
  The Punch Card Component will
  display the punch-card details
  such as `goal-for-the-day`,
  `punchedSlots`, etc.

  It also gives you an API for updating
  the goal for the punch-card with `onChangeGoal`, adding a punched-slot with
  `onAddPunchedSlot`, editing a punched-slot with
  `onUpdatePunchSlot`, etc.
*/
const PunchCard = ({
  id,
  punchedSlots, title,
  goalForTheDay,
  scheduledSlots,

  onUpdatePunchSlot,
  onAddPunchedSlot,
  onAddScheduledSlot,

  onDeleteScheduledSlot,
  onChangeScheduledSlot,

  onChangeGoal,
}) => {
  const [state, setState] = React.useState({
    goaInMinutes: 0,
    punchedMinutes: 0,
    scheduledMinutes: 0,
    punchedPercent: 0,
    scheduledPercent: 0,
    addScheduledSlotPanel: {
      isOpen: false
    },
    spinner: {
      show: false
    },
    punchedProgress: {
      label: <Text variant="mediumPlus">⏳Punched</Text>
    },
    scheduledProgress: {
      label: <Text variant="mediumPlus">🕚 Scheduled </Text>
    },
  });

  const updateAddScheduledSlotPanel = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      addScheduledSlotPanel: {
        ...currentState.addScheduledSlotPanel,
        ...update
      }
    }))
  },[]);

  const updateSpinner = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      spinner: {
          ...currentState.spinner,
          ...update
      }
    }))
  },[])

  const punchCard = {
    show: React.useMemo(() => Boolean(id), [id]),
    spinner: {
      ...state.spinner
    },
    text: {
      children: title,
      variant: 'large'
    },
    goalForTheDayForm: {
      ...goalForTheDay,
      onChangeGoal: React.useCallback((update) => {
        onChangeGoal({
          goalForTheDay: {
            ...goalForTheDay,
            ...update
          }
        })
      }, [onChangeGoal, goalForTheDay])
    },
    punchedSlots: {
      onUpdatePunchSlot: React.useCallback(async(updatedItem) => {
        updateSpinner({show: true})
        try {
          const updatedPunchSlotItems = punchedSlots
            .map(item => updatedItem.id === item.id ? ({
              ...item,
              ...updatedItem
            }) : item)
          await onUpdatePunchSlot({
            slots: updatedPunchSlotItems
          });
        } catch (e) {
          console.error('punch-slot did not update', e)
        } finally {
          updateSpinner({show: false})
        }
      },[punchedSlots, onUpdatePunchSlot, updateSpinner]),
      items: punchedSlots
    },
    punchCardButtons: {
      punchInText: React.useMemo(
        () => getPunchInButtonText(punchedSlots.length),
      [punchedSlots.length]),
      onClickPunchIn: React.useCallback(() => {
        const newPunchedSlot = {
          id: uuid(),
          inTime: Date.now(),
          outTime: null
        };
        onAddPunchedSlot({
          slots: [
            ...punchedSlots,
            newPunchedSlot
          ]
        })
      },[onAddPunchedSlot, punchedSlots]),
      onClickAddScheduledSlot: React.useCallback(() => {
        updateAddScheduledSlotPanel({isOpen: true})
      },[updateAddScheduledSlotPanel]),
      punchInDisabled: React.useMemo(
        () => !enablePunchInButton({
          items: punchedSlots
        }),
          [punchedSlots]
        ),
      showIcon: React.useMemo(
        () => Boolean(punchedSlots.length),
        [punchedSlots.length]
      )
    },
    punchedProgress: {
      ...state.punchedProgress,
      show: React.useMemo(
        () => Boolean(punchedSlots.length),
        [punchedSlots.length]
      ),
      progress: state.punchedPercent
    },
    addScheduledSlotPanel: {
      ...state.addScheduledSlotPanel,
      onAddScheduledSlot: React.useCallback((scheduledSlot) => {
        onAddScheduledSlot({
          scheduledSlots: [
            ...scheduledSlots,
            scheduledSlot
          ]
        })
        updateAddScheduledSlotPanel({
          isOpen: false
        })
      },[updateAddScheduledSlotPanel, onAddScheduledSlot,
        scheduledSlots]),
      onDismiss: React.useCallback(() => {
        updateAddScheduledSlotPanel({isOpen: false})
      },[updateAddScheduledSlotPanel])
    },
    scheduledSlots: {
      items: scheduledSlots,
      onDeleteSlot: onDeleteScheduledSlot,
      onChangeSlot: onChangeScheduledSlot
    },
    scheduledProgress: {
      ...state.scheduledProgress,
      show: React.useMemo(
        () => Boolean(punchedSlots.length),
        [punchedSlots.length]
      ),
      progress: state.scheduledPercent
    },
  }

  /**Effect when punchedSlots or goalForTheDay is updated*/
  React.useEffect(() => {
    const goalInMinutes = getGoalInMinutes(goalForTheDay);
    const punchedMinutes = getMinutesFromSlots({
      slots: punchedSlots
    });
    const scheduledMinutes = getMinutesFromSlots({
      slots: scheduledSlots
    })
    const punchedPercent = (() => {
      if(!goalInMinutes) return 0
      return (punchedMinutes/goalInMinutes)
    })()
    const scheduledPercent = (() => {
      if(!goalInMinutes) return 0
      return (scheduledMinutes/goalInMinutes)
    })()
    setState(currentState => ({
      ...currentState,
      goalInMinutes,
      punchedMinutes,
      scheduledMinutes,
      punchedPercent, scheduledPercent
    }))
  },[punchedSlots, goalForTheDay, scheduledSlots])

  return <PunchCardLayout {...punchCard} />
}

PunchCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,

  goalForTheDay: PropTypes.shape({
    hours: PropTypes.string.isRequired,
    minutes: PropTypes.string.isRequired
  }),

  punchedSlots: PropTypes.array,
  scheduledSlots: PropTypes.array,

  onChangeGoal: PropTypes.func.isRequired,
  onUpdatePunchSlot: PropTypes.func.isRequired,
  onAddPunchedSlot: PropTypes.func.isRequired,
  onAddScheduledSlot: PropTypes.func.isRequired,
  onDeleteScheduledSlot: PropTypes.func.isRequired,
  onChangeScheduledSlot: PropTypes.func.isRequired,
}

PunchCard.defaultProps = {
  punchedSlots: [],
  scheduledSlots: []
}

export default React.memo(PunchCard);
