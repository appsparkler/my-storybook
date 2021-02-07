import React from 'react'
import PropTypes from 'prop-types'
import MarkJS from 'mark.js/dist/mark.es6.min'

const unmark = (markJsInstance) =>
  new Promise((done) => {
    markJsInstance.unmark({
      done,
    })
  })

const useMarker = ({
  mark = new RegExp(),
  options = {},
  unmarkOptions = {},
  type = 'mark',
}) => {
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
      unmark(markerState.markJsInstance, unmarkOptions).then((...args) => {
        markerState.markJsInstance[type](mark, options)
      })
    }
  }, [mark, options, markerState.markJsInstance, type, unmarkOptions])

  return { markerRef }
}

const RegExpMarker = ({ children, mark, options, unmarkOptions }) => {
  const { markerRef } = useMarker({
    mark,
    options,
    unmarkOptions,
    type: 'markRegExp',
  })
  return <div ref={markerRef}>{children}</div>
}

RegExpMarker.propTypes = {
  /** mark options as documented [in the options section](https://markjs.io/#markregexp)*/
  options: PropTypes.object,
  /** A Regular Expression - for ex `/\.js/g` */
  mark: PropTypes.instanceOf(RegExp),
  /** un-mark options as documented [in the options section](https://markjs.io/#unmark)*/
  unmarkOptions: PropTypes.object,
  children: PropTypes.any,
}

RegExpMarker.defaultProps = {
  /** For a full list of options; visit **[markregexp](https://markjs.io/#markregexp)** */
  options: {},
  mark: new RegExp(),
  unmarkOptions: {},
}

export default React.memo(RegExpMarker)
