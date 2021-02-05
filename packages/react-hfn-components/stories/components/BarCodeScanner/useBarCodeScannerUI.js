import React from 'react'

export default () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  return {
    openModal: () => setIsModalOpen(true),
    isModalOpen,
    closeModal: () => setIsModalOpen(false),
  }
}
