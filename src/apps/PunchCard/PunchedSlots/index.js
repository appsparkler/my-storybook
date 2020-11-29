import React from 'react';
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import {
  DetailsList, mergeStyleSets,
  SelectionMode
} from '@fluentui/react'

const PunchedSlotsLayout = ({detailsList}) => (
  <DetailsList {...detailsList}/>
);

const classNames = mergeStyleSets({
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
  detailsListColumn: {
    width: '50% !important',
    '.ms-FocusZone': {
      // outline: '1px blue solid'
    },
    '.ms-DetailsHeader-cell': {
      width: '50%',
      // outline: '1px blue solid'
    }
  }
})

export const PunchedSlots = ({
  items
}) => {
  const [state, setState] = React.useState({
    detailsList: {
      className: classNames.detailsListColumn,
      items: [],
      selectionMode: SelectionMode.none,
      columns: [
        {
          id: uuid(),
          key: 'punch-in-time',
          name: 'In Time',
          fieldName: 'punchInTime',
          className: classNames.detailsListColumn,
          isResizable: false,
          // onRender: PunchInTimeCell
        },
        {
          id: uuid(),
          key: 'punch-out-time',
          name: 'Out Time',
          fieldName: 'punchOutTime',
          className: classNames.detailsListColumn,
          isResizable: false,
          // onRender: PunchOutTimeCell
        }
      ]
    }
  });

  const punchedSlots = {
    detailsList: {
      ...state.detailsList
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

  React.useEffect(() => {
    updateDetailsList({
      items: []
    })
  }, [items,  updateDetailsList])

  return show && <PunchedSlotsLayout {...punchedSlots} />
}

PunchedSlots.propTypes = {
  items: PropTypes.array.isRequired
}

export default React.memo(PunchedSlots);
