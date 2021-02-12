import React from 'react'

const Modal = ({ children }, ref) => {
  const [state, setState] = React.useState({
    isOpen: false,
  })
  const modalStyles = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'white',
  }
  ref.current.close = React.useCallback(() => {
    setState((currentState) => ({
      ...currentState,
      isOpen: false,
    }))
  }, [])
  ref.current.open = React.useCallback(() => {
    setState((currentState) => ({
      ...currentState,
      isOpen: true,
    }))
  }, [])
  if (!state.isOpen) {
    return null
  }
  return (
    <div style={modalStyles}>
      <button onClick={() => ref.current.close()}>Close</button>
      {children}
    </div>
  )
}

const ModalWithForwardRef = React.forwardRef(Modal)

export const Example = () => {
  const modalRef = React.useRef({})

  const openModal = React.useCallback(() => {
    modalRef.current.open()
  }, [])

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <ModalWithForwardRef ref={modalRef}>
        <h1>The Modal</h1>
        <p>Welcome to the modal!</p>
      </ModalWithForwardRef>
    </div>
  )
}

const Story = {
  title: 'POC/Complex Forward Ref',
}

export default Story
