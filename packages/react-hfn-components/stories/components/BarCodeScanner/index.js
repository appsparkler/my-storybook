import React from 'react'
import PropTypes from 'prop-types'
import ScannerModal from './ScannerModal'

const BarCodeScanner = ({
  onNewCodeDetected,
  isModalOpen,
  openModal,
  closeModal,
}) => {
  return (
    <ScannerModal
      onNewCodeDetected={onNewCodeDetected}
      isModalOpen={isModalOpen}
      openModal={openModal}
      closeModal={closeModal}
    />
  )
}

BarCodeScanner.propTypes = {
  onNewCodeDetected: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
}

BarCodeScanner.defaultProps = {
  onNewCodeDetected: () => {},
}

export default BarCodeScanner
