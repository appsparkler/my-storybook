import React from 'react'
import { Spinner as FarbicSpinner } from '@fluentui/react'

const SpinnerLayout = ({ show, spinner }) =>
  show && <FarbicSpinner {...spinner} />

const Spinner = ({ show }) => {
  const spinner = {
    show,
  }
  return <SpinnerLayout {...spinner} />
}

export default React.memo(Spinner)
