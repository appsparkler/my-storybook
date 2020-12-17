import React from 'react';
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import moment from 'moment'
import { Stack, Text} from '@fluentui/react'
import PunchedProgress from './PunchedProgress'
import GoalForTheDayForm from './GoalForTheDayForm'
import PunchedSlots from './PunchedSlots'
import PunchCardButtons from './PunchCardButtons'
import Spinner from './Spinner'
import {messages} from '../shared'
import ScheduledSlots from './ScheduledSlots'
import Progress from './Progress'
import InfoBar from './InfoBar'

const PunchCardLayout = ({
  show,
  text,
  goalForTheDayForm, punchedSlots,
  punchCardButtons, punchedProgress,
  addScheduledSlotButton, spinner,
  scheduledSlots, scheduledProgress,
  infoBar, progress
}) => (
  show && <Stack vertical tokens={{childrenGap: 10}}>
    <Stack horizontal tokens={{childrenGap: 5}}>
      <Text {...text} /> <Spinner {...spinner} />
    </Stack>
    <GoalForTheDayForm {...goalForTheDayForm} />
    <InfoBar {...infoBar} />
    <PunchedSlots {...punchedSlots} />
    <PunchCardButtons {...punchCardButtons} />
    <ScheduledSlots {...scheduledSlots}/>
    {/*<PunchedProgress {...punchedProgress} />*/}
    <Progress {...progress} />
    {/*<div dir="rtl">
      <PunchedProgress {...scheduledProgress} />
    </div>*/}
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
    minutesLeft: 0,
    punchedMinutes: 0,
    scheduledMinutes: 0,
    punchedPercent: 0,
    scheduledPercent: 0,
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
          id,
          goalForTheDay: {
            ...goalForTheDay,
            ...update
          }
        })
      }, [onChangeGoal, goalForTheDay, id])
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
            id,
            punchedSlots: updatedPunchSlotItems
          });
        } catch (e) {
          console.error('punch-slot did not update', e)
        } finally {
          updateSpinner({show: false})
        }
      },[punchedSlots, onUpdatePunchSlot, updateSpinner, id]),
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
          id,
          punchedSlots: [
            ...punchedSlots,
            newPunchedSlot
          ]
        })
      },[onAddPunchedSlot, punchedSlots, id]),
      onAddScheduledSlot: React.useCallback((scheduledSlot) => {
        onAddScheduledSlot({
          id,
          scheduledSlots: [
            ...scheduledSlots,
            scheduledSlot
          ]
        })
      },[
        onAddScheduledSlot,
        scheduledSlots, id
      ]),
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
    scheduledSlots: {
      items: scheduledSlots,
      onDeleteSlot: React.useCallback((deletedSlot) => {
        const updatedSlots = scheduledSlots
          .filter(slot => slot.id !== deletedSlot.id);
        onDeleteScheduledSlot({
          id,
          scheduledSlots: updatedSlots
        });
      },[onDeleteScheduledSlot, scheduledSlots, id]),
      onChangeSlot: React.useCallback((updatedSlot) => {
        const updatedSlots = scheduledSlots
          .map(slot => slot.id === updatedSlot.id ? ({
            ...slot,
            ...updatedSlot
          }): slot)
        onChangeScheduledSlot({
          id,
          scheduledSlots: updatedSlots
        })
      },[onChangeScheduledSlot, scheduledSlots, id])
    },
    progress: {
      punchedPercent: 20,
      show: true,
      scheduledPercent: 10
    },
    punchedProgress: {
      ...state.punchedProgress,
      show: React.useMemo(
        () => Boolean(punchedSlots.length),
        [punchedSlots.length]
      ),
      progress: state.punchedPercent
    },
    scheduledProgress: {
      ...state.scheduledProgress,
      show: React.useMemo(
        () => Boolean(scheduledSlots.length),
        [scheduledSlots.length]
      ),
      progress: state.scheduledPercent
    },
    infoBar: {
      minutesLeft: React.useMemo(
        () => state.minutesLeft,
        [state.minutesLeft]
      )
    }
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
    const minutesLeft = goalInMinutes ? goalInMinutes - punchedMinutes : 0;
    setState(currentState => ({
      ...currentState,
      goalInMinutes,
      punchedMinutes,
      scheduledMinutes,
      punchedPercent, scheduledPercent,
      minutesLeft
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

  onChangeGoal: PropTypes.func,
  onUpdatePunchSlot: PropTypes.func,
  onAddPunchedSlot: PropTypes.func,
  onAddScheduledSlot: PropTypes.func,
  onDeleteScheduledSlot: PropTypes.func,
  onChangeScheduledSlot: PropTypes.func,
}

PunchCard.defaultProps = {
  punchedSlots: [],
  scheduledSlots: []
}

export default React.memo(PunchCard);
