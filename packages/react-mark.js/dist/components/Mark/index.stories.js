"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Ranges = exports.RegExp = exports.String = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Story = {
  title: 'components/Mark',
  component: _["default"]
};

var Template = function Template(args) {
  return /*#__PURE__*/_react["default"].createElement(_["default"], args, args.children);
};

Template.args = {
  children: 'Hello World',
  mark: 'o'
};
var String = Template.bind({});
exports.String = String;
String.args = _objectSpread({}, Template.args);
var RegExp = Template.bind({});
exports.RegExp = RegExp;
RegExp.args = _objectSpread(_objectSpread({}, Template.args), {}, {
  type: 'markRegExp',
  mark: /l/
});
var Ranges = Template.bind({});
exports.Ranges = Ranges;
Ranges.args = _objectSpread(_objectSpread({}, Template.args), {}, {
  children: '0123456789',
  type: 'markRanges',
  mark: [{
    start: 1,
    length: 3
  }, {
    start: 6,
    length: 4
  }]
});
var _default = Story;
exports["default"] = _default;