import React from 'react'
import PropTypes from 'prop-types'
import MarkJS from 'mark.js/dist/mark.es6.min'

const unmark = (markJsInstance) => new Promise((done) => {
  markJsInstance.unmark({
    done
  })
})

const Mark = (props) => {
  const markerRef = React.useRef();

  const [markerState, setMarkerState] = React.useState({
    markJsInstance: null,
    lastUpdated: null
  })

  React.useEffect(() => {
    if(markerRef.current) {
      setMarkerState(currentState => ({
        ...currentState,
        markJsInstance: new MarkJS(markerRef.current)
      }))
    }
  },[])

  React.useEffect(() => {
    if(markerState.markJsInstance) {
      unmark(markerState.markJsInstance)
        .then(() => {
          markerState
            .markJsInstance
            .mark(props.mark, props.options);
        })
    }
  }, [props.mark, markerState.markJsInstance, props.options])

  return (
    <div ref={markerRef}>
      {props.children}
    </div>
  )
}

Mark.propTypes = {
  /** mark options as documents [here](https://markjs.io/#parameters)*/
  options: PropTypes.object,
  mark: PropTypes.string
}

Mark.defaultProps = {
  options: {}
}

export default React.memo(Mark)
