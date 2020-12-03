import React from 'react'
import PropTypes from 'prop-types'
import {ProgressIndicator, Text} from '@fluentui/react'

const PunchedProgressLayout = ({
  show, progressIndicator
}) => show && <ProgressIndicator {...progressIndicator}/>

const PunchedProgress = ({
  show, progress, label
}) => {
  const [state] = React.useState({
    progressIndicator: {
      label ,
      barHeight: 12,
    }
  })
  const punchedProgress = {
    show,
    progressIndicator: {
      ...state.progressIndicator,
      percentComplete: progress,
    }
  }
  return (
    <PunchedProgressLayout {...punchedProgress} />
  )
}

PunchedProgressLayout.propTypes = {
  show: PropTypes.bool,
  progress: PropTypes.number
}

PunchedProgressLayout.defaultProps = {
  show: false,
  progress: 0
}

export default React.memo(PunchedProgress)
