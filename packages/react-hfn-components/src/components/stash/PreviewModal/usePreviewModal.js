import React from 'react'

export default ({imgSrc, disabled}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    imgSrc,
    disabled,
  }
}
