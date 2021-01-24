import React from 'react'
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
  },[markerRef])

  React.useEffect(() => {
    if(markerState.markJsInstance) {
      markerState
        .markJsInstance
        .unmark({
          done: () => {
            setMarkerState(currentState => ({
              ...currentState,
              lastUpdated: Date.now()
            }))
          }
        });
    }
  }, [props.mark, markerState.markJsInstance])

  React.useEffect(() => {
    if(markerState.lastUpdated) {
      markerState
        .markJsInstance
        .mark(props.mark);
    }
  }, [
    props.mark,
    markerState.lastUpdated,
    markerState.markJsInstance
  ])

  return (
    <div ref={markerRef}>
      {props.children}
    </div>
  )
}

export default React.memo(Mark)
