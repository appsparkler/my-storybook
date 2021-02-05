import React from 'react'
import { useId, useBoolean } from '@uifabric/react-hooks'
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  DefaultButton,
  Modal,
  IconButton,
} from 'office-ui-fabric-react'
import { UploadPhotoPivots } from './UploadPhotoPivots'

const cancelIcon = { iconName: 'Cancel' }

export const ModalBasicExample = () => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  )
  const titleId = useId('title')
  return (
    <div>
      <DefaultButton onClick={showModal} text="Add/Edit Photo" />
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Add/Edit Photo</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={hideModal}
          />
        </div>
        <div className={contentStyles.body}>
          <UploadPhotoPivots />
        </div>
      </Modal>
    </div>
  )
}

const theme = getTheme()
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    height: '90%',
    width: '90%',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
})
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
}
