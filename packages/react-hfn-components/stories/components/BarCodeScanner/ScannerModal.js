import React from 'react'
import PropTypes from 'prop-types'
import { useId } from '@uifabric/react-hooks'
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  DefaultButton,
  Modal,
  IconButton,
} from 'office-ui-fabric-react'
import Scanner from './Scanner'

const cancelIcon = { iconName: 'Cancel' }

const ScannerModal = ({
  isModalOpen,
  openModal,
  closeModal,
  onNewCodeDetected,
}) => {
  const titleId = useId('title')
  return (
    <div>
      <DefaultButton primary onClick={openModal} text="Scan ID Card" />
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={closeModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>Scanner</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={closeModal}
          />
        </div>
        <div className={contentStyles.body}>
          <Scanner
            closeModal={closeModal}
            onNewCodeDetected={onNewCodeDetected}
          />
        </div>
      </Modal>
    </div>
  )
}

ScannerModal.propTypes = {
  isModalOpen: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
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

ScannerModal.propTypes = {
  onNewCodeDetected: PropTypes.func,
}

ScannerModal.defaultProps = {
  onNewCodeDetected: () => {},
}

export default ScannerModal
