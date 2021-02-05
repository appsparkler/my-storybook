"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _markEs = _interopRequireDefault(require("mark.js/dist/mark.es6.min"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var unmark = function unmark(markJsInstance) {
  return new Promise(function (done) {
    markJsInstance.unmark({
      done: done
    });
  });
};

var Mark = function Mark(props) {
  var markerRef = _react["default"].useRef();

  var _React$useState = _react["default"].useState({
    markJsInstance: null
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      markerState = _React$useState2[0],
      setMarkerState = _React$useState2[1];

  _react["default"].useEffect(function () {
    if (markerRef.current) {
      setMarkerState(function (currentState) {
        return _objectSpread(_objectSpread({}, currentState), {}, {
          markJsInstance: new _markEs["default"](markerRef.current)
        });
      });
    }
  }, []);

  _react["default"].useEffect(function () {
    if (markerState.markJsInstance) {
      unmark(markerState.markJsInstance).then(function () {
        markerState.markJsInstance[props.type](props.mark, props.options);
      });
    }
  }, [props.mark, props.options, props.type, markerState.markJsInstance]);

  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: markerRef
  }, props.children);
};

Mark.propTypes = {
  /** mark options as documents [here](https://markjs.io/#parameters)*/
  options: _propTypes["default"].object,
  type: _propTypes["default"].oneOf(['mark', 'markRegExp', 'markRanges']),

  /**
  1. `String` if `type = mark (default)`([mark docs](https://markjs.io/#mark))
  1. `RegExp` if `type = markRegExp` ([markRegExp docs](https://markjs.io/#markregexp))
  1. `Array` if `type = markRanges` ([markRanges docs](https://markjs.io/#markranges))
  */
  mark: _propTypes["default"].oneOfType([_propTypes["default"].instanceOf(RegExp), _propTypes["default"].string, _propTypes["default"].array]),
  unmarkOptions: _propTypes["default"].object
};
Mark.defaultProps = {
  options: {},
  type: 'mark',
  mark: ''
};

var _default = /*#__PURE__*/_react["default"].memo(Mark);

exports["default"] = _default;