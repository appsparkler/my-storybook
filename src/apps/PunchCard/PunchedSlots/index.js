import React from 'react';
import PropTypes from 'prop-types'
import {
  DetailsList
} from '@fluentui/react'

const PunchedSlotsLayout = ({detailsList}) => (
  <DetailsList {...detailsList}/>
);

export const PunchedSlots = ({
  items
}) => {
  const [state, setState] = React.useState({
    detailsList: {
      items: [],
      columns: [
        {
          onRender:(item) => item
        },{
          onRender:(item) => item
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
      items: ['foo', 'bar']
    })
  }, [items,  updateDetailsList])

  return show && <PunchedSlotsLayout {...punchedSlots} />
}

PunchedSlots.propTypes = {
  items: PropTypes.array.isRequired
}

export default React.memo(PunchedSlots);
