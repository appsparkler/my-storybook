import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import {v4 as uuid} from 'uuid'
import _ from 'lodash'
import PunchInTimeCell from '../PunchInTimeCell'
import PunchOutTimeCell from '../PunchOutCell'
import {FORMAT} from '../shared'
import {
  DetailsList, mergeStyleSets,
  SelectionMode, Label, Stack
} from '@fluentui/react'

const PunchedSlotsLayout = ({
  label0, detailsList
}) => (
  <Stack>
    <Label {...label0} />
    <DetailsList {...detailsList}/>
  </Stack>
);

const classNames = mergeStyleSets({
  detailsList: {
    '.ms-DetailsList-headerWrapper': {
      '.ms-FocusZone.ms-DetailsHeader': {
        paddingTop: 0,
        '.ms-DetailsHeader-cell': {
          maxWidth: '50%',
          minWidth: '50%'
        }
      }
    },
    '.ms-DetailsRow-fields': {
      display: 'flex',
      '.ms-DetailsRow-cell': {
        maxWidth: '50%',
        minWidth: '50%'
      }
    }
  },
})

export const verifyNewInTime = ({
  slots, newInTime, item
}) => {
  const newInTimeMoment = moment(newInTime, 'YYYY-MM-DD HH:mm');

  // check if less than current time
  const isGreaterThanCurrentTime = newInTimeMoment > moment();
  if(isGreaterThanCurrentTime) {
    return {
      isValid: false,
      errorMessage: '> than current-time'
    }
  }

  // test IF the time is less than previos outTime IF there is
  // a previous out time (newInTime should not be greater than previous out time)
  const itemIndex = _.findIndex(
    slots,
    fItem => item.id === fItem.id
  )
  if(itemIndex > 0) {
    const previousItemIndex = itemIndex - 1;
    const previousItem = slots[previousItemIndex].item;
    const prevOutTime = previousItem.outTime;
    const isPrevOutTimeLessThanNewInTime = newInTimeMoment.valueOf() <= prevOutTime;
    if(isPrevOutTimeLessThanNewInTime) {
      return {
        isValid: false,
        errorMessage: `< prev out`
      }
    }
  }

  // newInTime should be less than or equal to current outTime
  const {outTime} = item.item;
  if(outTime) {
    const isOutTimeLessThanNewInTime = outTime <= newInTimeMoment.valueOf()
    if(isOutTimeLessThanNewInTime) {
      return {
        isValid: false,
        errorMessage: `> current out.`
      }
    }
  }

  // if not invalid; return isValid = true
  return {
    isValid: true
  }
}

const PunchedSlots = ({
  items, onUpdatePunchSlot
}) => {
  const [state, setState] = React.useState({
    label0: {
      children: 'Punched Slots'
    },
    detailsList: {
      className: classNames.detailsList,
      items: [],
      selectionMode: SelectionMode.none,
      columns: [
        {
          id: uuid(),
          key: 'punch-in-time',
          name: 'In Time',
          fieldName: 'punchInTime',
          isResizable: false,
          onRender: ({punchInTimeCell}) => <PunchInTimeCell
            {...punchInTimeCell}
          />
        },
        {
          id: uuid(),
          key: 'punch-out-time',
          name: 'Out Time',
          fieldName: 'punchOutTime',
          isResizable: false,
          onRender: ({punchOutTimeCell}) => <PunchOutTimeCell {...punchOutTimeCell} />
        }
      ]
    }
  });

  const punchedSlots = {
    detailsList: {
      ...state.detailsList
    },
    label0: {
      ...state.label0
    }
  };

  const updateDetailsList = React.useCallback((update) => {
    setState((currentState) => ({
      ...currentState,
      detailsList: {
        ...currentState.detailsList,
        ...update
      }
    }))
  },[])

  const updateDetailsList2 = React.useCallback((getUpdate) => {
    setState((currentState) => ({
      ...currentState,
      detailsList: {
        ...currentState.detailsList,
        ...getUpdate(currentState.detailsList)
      }
    }))
  },[])

  const updateDetailsListItem = React.useCallback((update) => {
    setState(currentState => {
      const updatedItems = currentState
        .detailsList
        .items
        .map((item) => {
          if(update.id === item.id) {
            return _.merge(
              item,
              update
            )
          } else {
            return item
          }
        })
      return {
        ...currentState,
        detailsList: {
          ...currentState.detailsList,
          items: updatedItems
        }
      }
    })
  }, [])

  const show = React.useMemo(
    () => Boolean(state.detailsList.items.length),
    [state.detailsList.items.length]
  )

  /** Update DetailsList items when items are updated */
  React.useEffect(() => {
    const updatedItems = items.map((item, idx) => ({
      item,
      id: item.id,
      punchInTimeCell: {
        value: moment(item.inTime).format(FORMAT),
        onChange: (newInTime) => {
          const {
            isValid,
            errorMessage = ''
          } = verifyNewInTime({
            newInTime,
            slots: updatedItems,
            item: updatedItems.find(uItem => uItem.id === item.id)
          })
          updateDetailsListItem({
            id: item.id,
            punchInTimeCell: {
              errorMessage
            }
          })
          if(isValid) {
            onUpdatePunchSlot({
              id: item.id,
              inTime: moment(newInTime, FORMAT).valueOf()
            })
          }
        },
        onError: (errorMessage) => updateDetailsListItem({
          id: item.id,
          punchInTimeCell: {
            errorMessage
          }
        })
      },
      punchOutTimeCell: {
        value: item.outTime && moment(item.outTime).format(FORMAT),
        onChange: console.log,
        onError: (errorMessage) => {
          updateDetailsListItem({
            id: item.id,
            punchOutTimeCell: {
              errorMessage
            }
          })
        },
        onClick: () => {
          onUpdatePunchSlot({
            id: item.id,
            outTime: moment().valueOf()
          })
        }
      }
    }));
    updateDetailsList({
      items: updatedItems
    })
  }, [
    items,
    updateDetailsList, updateDetailsList2, updateDetailsListItem, onUpdatePunchSlot
  ])

  return show && <PunchedSlotsLayout {...punchedSlots} />
}

PunchedSlots.propTypes = {
  items: PropTypes.array.isRequired,
  onUpdatePunchSlot: PropTypes.func.isRequired
}

export default React.memo(PunchedSlots);
