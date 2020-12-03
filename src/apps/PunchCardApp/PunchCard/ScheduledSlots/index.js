import React  from 'react'
import PropTypes from 'prop-types'
import {
  IconButton, SelectionMode,
  mergeStyleSets
} from '@fluentui/react'
import DetailsListWithText from '../../../../components/DetailsListWithText'
import DateTimeTextField from '../PunchInTimeCell'
import {FORMAT} from '../../shared'
import moment from 'moment'

const InTextField = ({inTextField}) => <DateTimeTextField {...inTextField}/>

const OutTextField = ({outTextField}) => <DateTimeTextField {...outTextField}/>

const classNames = mergeStyleSets({
  detailsList: {
    '.ms-DetailsList-headerWrapper': {
      '.ms-FocusZone.ms-DetailsHeader': {
        paddingTop: 0,
        '.ms-DetailsHeader-cell': {
          maxWidth: 'calc(50% - 15px)',
          minWidth: 'calc(50% - 15px)'
        },
        '.ms-DetailsHeader-cell[data-item-key="deleteicon"]': {
          minWidth: 30,
          maxWidth: 30,
          width: 30,
        }
      }
    },
    '.ms-DetailsRow.ms-FocusZone': {
      width: '100%',
      minWidth: 'auto',
    },
    '.ms-DetailsRow-fields': {
      display: 'flex',
      width: '100%',
      '.ms-DetailsRow-cell': {
        maxWidth: 'calc(50% - 15px)',
        minWidth: 'calc(50% - 15px)'
      },
      '.ms-DetailsRow-cell.deleteIconColumn': {
        minWidth: 30,
        maxWidth: 30
      },
    },
  },
})

const ScheduledSlots = ({
  items, onDeleteSlot, onChangeSlot
}) => {
  const [state, setState] = React.useState({
    detailsList: {
      items: []
    }
  })

  const updateDetailsList = React.useCallback((update) => {
    setState(currenState => ({
      ...currenState,
      detailsList: {
        ...currenState.detailsList,
        ...update
      }
    }))
  },[])

  const detailsListWithText = {
    show: true,
    detailsList: {
      ...state.detailsList,
      className: classNames.detailsList,
      selectionMode: SelectionMode.none,
      columns: [{
        key: 'inTime',
        name: 'In Time',
        onRender: InTextField
      }, {
        key: 'outTime',
        name: 'Out Time',
        onRender: OutTextField
      },{
        key: "deleteicon",
        className: 'deleteIconColumn',
        onRender: ({deleteIconButton}) => <IconButton
          iconProps={{iconName: 'Trash'}}
          {...deleteIconButton}
        />
      }],
    },
    text: {

    }
  }

  React.useEffect(() => {
    // const updatedItems = [{
    //   id: '123',
    //   key: '123',
    //   name: 'In Time',
    //   inTextField: {
    //     value: '2020-11-12 12:30',
    //     onError: () => alert('oops'),
    //     onChange: () => alert('ok')
    //   },
    //   outTextField: {
    //     value: '2020-11-12 13:30',
    //     onError: () => alert('oops out'),
    //     onChange: () => alert('ok out')
    //   },
    //   deleteIconButton: {
    //     onClick: () => alert('lets delete 123')
    //   }
    // },{
    //   id: '124',
    //   key: '124',
    //   inTextField: {
    //     value: '2020-11-12 11:30',
    //     onError: () => alert('oops'),
    //     onChange: () => alert('ok')
    //   },
    //   outTextField: {
    //     value: '2020-11-12 12:30',
    //     onError: () => alert('oops'),
    //     onChange: () => alert('ok')
    //   },
    //   deleteIconButton: {
    //     onClick: () => alert('lets delete 124')
    //   }
    // }]
    const updatedItems = items
      .map(item => ({
        id: item.id,
        inTextField: {
          value: moment(item.inTime).format(FORMAT),
          onError: () => alert('oops out'),
          onChange: () => alert('ok out')
        },
        outTextField: {
          value: moment(item.outTime).format(FORMAT),
          onError: () => alert('oops out'),
          onChange: () => alert('ok out')
        },
        deleteIconButton: {
          onClick: () => alert(`ready to delete ${item.id}?`)
        }
      }))

    updateDetailsList({
      items: updatedItems
    })
  },[updateDetailsList, items])
  return <DetailsListWithText {...detailsListWithText} />
}

ScheduledSlots.propTypes = {
  items: PropTypes.array,

  onDeleteSlot: PropTypes.func,
  onChangeSlot: PropTypes.func
}


export default React.memo(ScheduledSlots)
