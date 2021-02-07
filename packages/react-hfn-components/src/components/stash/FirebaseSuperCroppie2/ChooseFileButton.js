import React from 'react'
import {DefaultButton, mergeStyleSets} from 'office-ui-fabric-react'
import {useId} from '@uifabric/react-hooks'
import PropTypes from 'prop-types'

const ChooseFileButton = (props) => {
  const inputFieldId = useId('file-input')
  return (
    <div className={contentStyles.buttonWrapper}>
      <label htmlFor={inputFieldId} className={contentStyles.labelStyles}>
        <DefaultButton primary text="Choose File" />
        <div className={contentStyles.defaultButtonStyles}></div>
      </label>
      <input
        id={inputFieldId}
        className={contentStyles.fileInput}
        type="file"
        accept="image/*"
        onChange={props.onFileInputChange}
      />
    </div>
  )
}

ChooseFileButton.propTypes = {
  onFileInputChange: PropTypes.func.isRequired,
}

export default ChooseFileButton

const contentStyles = mergeStyleSets({
  buttonWrapper: {
    position: 'relative',
    display: 'flex',
  },
  fileInput: {
    display: 'none',
  },
  defaultButtonStyles: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  labelStyles: {
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
  },
})
