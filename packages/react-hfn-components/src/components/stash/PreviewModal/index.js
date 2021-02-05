import React from 'react'
import PropTypes from 'prop-types'
import HOCPreviewModal from './hoc'
import usePreviewModal from './usePreviewModal'

const PreviewModal = ({ imgSrc, disabled }) => {
  const config = usePreviewModal({ imgSrc, disabled })
  return <HOCPreviewModal {...config} />
}

PreviewModal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default PreviewModal
