import React from 'react'
import MarkJS from 'mark.js'

const Mark = (props, ref) => {
  
  return (
    <div>
      {props.children}
    </div>
  )
}

export default React.forwardRef(Mark)
