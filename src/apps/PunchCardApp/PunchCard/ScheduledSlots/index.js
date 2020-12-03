import React  from 'react'
import {
  IconButton, SelectionMode,
  mergeStyleSets
} from '@fluentui/react'
import DetailsListWithText from '../../../../components/DetailsListWithText'
import DateTimeTextField from '../PunchInTimeCell'

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

const ScheduledSlots = () => {
  const detailsListWithText = {
    show: true,
    detailsList: {
      className: classNames.detailsList,
      selectionMode: SelectionMode.none,
      columns: [{
        name: 'In Time',
        onRender: InTextField
      }, {
        name: 'Out Time',
        onRender: OutTextField
      },{
        key: "deleteicon",
        className: 'deleteIconColumn',
        onRender: () => <IconButton
          iconProps={{iconName: 'Trash'}}
        />
      }],
      items: [{
        id: '123',
        name: 'In Time',
        inTextField: {
          value: '2020-11-12 12:30',
          onError: () => alert('oops'),
          onChange: () => alert('ok')
        },
        outTextField: {
          value: '2020-11-12 13:30',
          onError: () => alert('oops out'),
          onChange: () => alert('ok out')
        },
      },{
        id: '124',
        inTextField: {
          value: '2020-11-12 11:30',
          onError: () => alert('oops'),
          onChange: () => alert('ok')
        },
        outTextField: {
          value: '2020-11-12 12:30',
          onError: () => alert('oops'),
          onChange: () => alert('ok')
        }
      }]
    },
    text: {

    }
  }
  return <DetailsListWithText {...detailsListWithText} />
}


export default React.memo(ScheduledSlots)
