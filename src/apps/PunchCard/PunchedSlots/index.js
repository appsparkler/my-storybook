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
      // outline: '1px blue solid',
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

  const show = React.useMemo(
    () => Boolean(state.detailsList.items.length),
    [state.detailsList.items.length]
  )

  /** Update DetailsList items when items are updated */
  React.useEffect(() => {
    updateDetailsList({
      items: items.map(item => ({
        item,
        punchInTimeCell: {
          value: moment(item.startTime).format(FORMAT),
          onChange: console.log
        },
        punchOutTimeCell: {
          value: item.endTime && moment(item.endTime).format(FORMAT),
          onChange: console.log,
          onClick: console.log
        }
      }))
    })
  }, [items,  updateDetailsList])

  return show && <PunchedSlotsLayout {...punchedSlots} />
}

PunchedSlots.propTypes = {
  items: PropTypes.array.isRequired
}

export default React.memo(PunchedSlots);
