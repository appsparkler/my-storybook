import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import {v4 as uuid} from 'uuid'
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

const PunchedSlots = ({
  items
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
        value: moment(item.startTime).format(FORMAT),
        onChange: (newValue) => {
          updateDetailsList2((detailsList) => {
            return {
              items: detailsList.items.map((item2, idx2) => {
                if(item.id === item2.id) {
                  console.log({item, item2})
                  return {
                    ...item2,
                    punchInTimeCell: {
                      ...item2.punchInTimeCell,
                      errorMessage: "oops!"
                    }
                  }
                } else {
                  return item2
                }
              })
            }
          })
        }
      },
      punchOutTimeCell: {
        value: item.endTime && moment(item.endTime).format(FORMAT),
        onChange: console.log,
        onClick: console.log
      }
    }));
    updateDetailsList({
      items: updatedItems
    })
  }, [items, updateDetailsList, updateDetailsList2])

  return show && <PunchedSlotsLayout {...punchedSlots} />
}

PunchedSlots.propTypes = {
  items: PropTypes.array.isRequired
}

export default React.memo(PunchedSlots);
