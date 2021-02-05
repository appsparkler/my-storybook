import React from 'react'

export default (props) => {
  const [file, setFile] = React.useState(null)
  const [isVerifying, setIsVerifying] = React.useState(false)
  return {
    ...props,
    file,
    setFile,
    isVerifying,
    setIsVerifying,
  }
}
