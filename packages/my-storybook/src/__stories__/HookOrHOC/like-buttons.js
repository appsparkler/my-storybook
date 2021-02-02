import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
)
Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  onMouseOver: PropTypes.func,
}

// hooking
export const HookedLikeButton = ({ children, ...props }) => {
  const onClick = React.useCallback(() => alert('like'), [])
  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  )
}
HookedLikeButton.propTypes = {
  children: PropTypes.any,
  onMouseOver: PropTypes.func,
}

// hoc-ing
const likify = (Component) => ({ onClick: onClick0, ...props }) => {
  const onClick1 = React.useCallback(
    (...args) => {
      alert('like')
      onClick0(...args)
    },
    [onClick0]
  )

  return <Component {...props} onClick={onClick1} />
}

export const LikeButton = likify(Button)
LikeButton.propTypes = {
  Component: PropTypes.func,
}
