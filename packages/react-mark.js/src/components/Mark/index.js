import React from 'react'
import PropTypes from 'prop-types'
import MarkJS from 'mark.js/dist/mark.es6.min'

const unmark = (markJsInstance) =>
  new Promise((done) => {
    markJsInstance.unmark({
      done,
    })
  })

const Mark = (props) => {
  const markerRef = React.useRef()

  const [markerState, setMarkerState] = React.useState({
    markJsInstance: null,
  })

  React.useEffect(() => {
    if (markerRef.current) {
      setMarkerState((currentState) => ({
        ...currentState,
        markJsInstance: new MarkJS(markerRef.current),
      }))
    }
  }, [])

  React.useEffect(() => {
    if (markerState.markJsInstance) {
      unmark(markerState.markJsInstance).then((...args) => {
        markerState.markJsInstance[props.type](props.mark, props.options)
      })
    }
  }, [props.mark, props.options, props.type, markerState.markJsInstance])

  return <div ref={markerRef}>{props.children}</div>
}

Mark.propTypes = {
  /** mark options as documents [here](https://markjs.io/#parameters)*/
  options: PropTypes.object,
  type: PropTypes.oneOf(['mark', 'markRegExp', 'markRanges']),
  /**
1. `String` if `type = mark (default)`([mark docs](https://markjs.io/#mark))
1. `RegExp` if `type = markRegExp` ([markRegExp docs](https://markjs.io/#markregexp))
1. `Array` if `type = markRanges` ([markRanges docs](https://markjs.io/#markranges))
  */
  mark: PropTypes.oneOfType([
    PropTypes.instanceOf(RegExp),
    PropTypes.string,
    PropTypes.array,
  ]),
  unmarkOptions: PropTypes.object,
}

Mark.defaultProps = {
  options: {},
  type: 'mark',
  mark: '',
}

export default React.memo(Mark)
