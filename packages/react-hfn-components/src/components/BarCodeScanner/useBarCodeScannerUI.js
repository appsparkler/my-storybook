import React from 'react'

function scanResultDidChange({ setIsModalOpen, scanResult }) {
  if (scanResult) setIsModalOpen(true)
}

export default ({ scanResult }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  React.useEffect(
    scanResultDidChange.bind(null, {
      setIsModalOpen,
      scanResult,
    }),
    [scanResult]
  )
  return {
    isModalOpen,
    closeModal: () => setIsModalOpen(false),
  }
}
