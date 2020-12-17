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
import {verifyNewInTime, verifyNewOutTime} from '../PunchedSlots'

const InTextField = ({inTextField}) => <DateTimeTextField {...inTextField}/>

const OutTextField = ({outTextField}) => <DateTimeTextField {...outTextField}/>

const classNames = mergeStyleSets({
  detailsList: {
    '.ms-FocusZone.ms-DetailsHeader': {
      paddingTop: 0
    },
    '.ms-DetailsList-headerWrapper': {
      '.ms-DetailsHeader-cell': {
        maxWidth: 'calc(50% - 15px) !important',
        minWidth: 'calc(50% - 15px) !important',
      },
      '.ms-DetailsHeader-cell[data-item-key="deleteicon"]': {
        width: '30px !important',
        maxWidth: '30px !important',
        minWidth: '30px !important',
      }
    },
    '.ms-List-cell': {
      '.ms-DetailsRow': {
        minWidth: '100% !important',
        '.ms-DetailsRow-fields': {
          width: '100%',
          '.deleteIconColumn.ms-DetailsRow-cell': {
            minWidth: '30px !important',
            maxWidth: '30px !important',
          },
          '.ms-DetailsRow-cell': {
            minWidth: 'calc(50% - 15px)',
            maxWidth: 'calc(50% - 15px)',
          }
        }
      }
    }
  }
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
    show: Boolean(items.length),
    detailsList: {
      ...state.detailsList,
      className: classNames.detailsList,
      selectionMode: SelectionMode.none,
      columns: [{
        key: 'inTime',
        name: 'In Time',
        onRender: InTextField
      },{
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
      children: '🕚Scheduled Slots',
      variant: 'mediumPlus'
    }
  }

  /** Customize Items for DetailsList*/
  React.useEffect(() => {
    const updatedItems = items
      .map(item => ({
        id: item.id,
        item,
        inTextField: {
          value: moment(item.inTime).format(FORMAT),
          onError: (errorMessage) => updateDetailsList({
            items: updatedItems.map(uItem => uItem.id === item.id ?
              ({
                  ...uItem,
                  inTextField: {
                    ...uItem.inTextField,
                    errorMessage
                  }
              }) : uItem)
          }),
          onChange: (newInTime) => {
            const {
              isValid,
              errorMessage = ''
            } = verifyNewInTime({
              newInTime,
              slots: updatedItems,
              item: updatedItems.find(uItem => uItem.id === item.id),
              verifyIsGreaterThanNow: false
            })
            updateDetailsList({
              items: updatedItems.map(uItem => uItem.id === item.id ?
                ({
                    ...uItem,
                    inTextField: {
                      ...uItem.inTextField,
                      errorMessage
                    }
                }) : uItem)
            })
            if(isValid) {
              onChangeSlot({
                id: item.id,
                inTime: moment(newInTime, FORMAT).valueOf(),
              })
            }
          }
        },
        outTextField: {
          value: moment(item.outTime).format(FORMAT),
          onError: (errorMessage) => updateDetailsList({
            items: updatedItems.map(uItem => uItem.id === item.id ?
              ({
                  ...uItem,
                  outTextField: {
                    ...uItem.outTextField,
                    errorMessage
                  }
              }) : uItem)
          }),
          onChange: (newOutTime) => {
            const {
              isValid, errorMessage = ''
            } = verifyNewOutTime({
              newOutTime,
              modifiedItems: updatedItems,
              id: item.id,
              verifyIsGreaterThanNow: false
            })
            updateDetailsList({
              items: updatedItems.map(uItem => uItem.id === item.id ?
                ({
                    ...uItem,
                    outTextField: {
                      ...uItem.outTextField,
                      errorMessage
                    }
                }) : uItem)
            })
            if(isValid) {
              onChangeSlot({
                id: item.id,
                outTime: moment(newOutTime, FORMAT).valueOf()
              })
            }
          },
        },
        deleteIconButton: {
          onClick: () => onDeleteSlot(item)
        }
      }))

    updateDetailsList({
      items: updatedItems
    })
  },[updateDetailsList, items, onDeleteSlot, onChangeSlot])

  return <DetailsListWithText {...detailsListWithText} />
}

ScheduledSlots.propTypes = {
  items: PropTypes.array,

  onDeleteSlot: PropTypes.func,
  onChangeSlot: PropTypes.func
}


export default React.memo(ScheduledSlots)
