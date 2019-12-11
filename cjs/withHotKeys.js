"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _backwardsCompatibleContext = _interopRequireDefault(require("./utils/backwardsCompatibleContext"));

var _FocusOnlyComponentManager = _interopRequireDefault(require("./lib/metal/FocusOnlyComponentManager"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   * A unique key to associate with KeyEventMatchers that allows associating handler
   * functions at a later stage
   * @typedef {string} ActionName
   */

  /**
   * Name of a key event
   * @typedef {'keyup'|'keydown'|'keypress'} KeyEventName
   */

  /**
   * A string or list of strings, that represent a sequence of one or more keys
   * @typedef {String | Array.<String>} MouseTrapKeySequence
   * @see {@link https://craig.is/killing/mice} for support key sequences
   */

  /**
   * Options for the mapping of a key sequence and event
   * @typedef {Object} KeyEventOptions
   * @property {MouseTrapKeySequence} sequence - The key sequence required to satisfy a
   *           KeyEventDescription
   * @property {KeyEventName} action - The keyboard state required to satisfy a
   *           KeyEventDescription
   * @property {string} name - The name of the action, to be displayed to the end user
   * @property {string} description - A description of the action, to be displayed to
   *           the end user
   * @property {string} group - A group the action belongs to, to aid in showing similar
   *           actions to the user
   */

  /**
   * A description of key sequence of one or more key combinations
   * @typedef {MouseTrapKeySequence|KeyEventOptions|Array.<MouseTrapKeySequence>} KeyEventDescription
   */

  /**
   * A mapping from ActionName to KeyEventDescription
   * @typedef {Object.<ActionName, KeyEventDescription>} KeyMap
   */

  /**
   * A map from action names to Mousetrap or Browser key sequences
   * @type {KeyMap}
   */
  keyMap: _propTypes.default.object,

  /**
   * A map from action names to event handler functions
   * @typedef {Object.<ActionName, Function>} HandlersMap
   */

  /**
   * A map from action names to event handler functions
   * @type {HandlersMap}
   */
  handlers: _propTypes.default.object,

  /**
   * Function to call when this component gains focus in the browser
   * @type {function}
   */
  onFocus: _propTypes.default.func,

  /**
   * Function to call when this component loses focus in the browser
   * @type {function}
   */
  onBlur: _propTypes.default.func,

  /**
   * Whether the keyMap or handlers are permitted to change after the
   * component mounts. If false, changes to the keyMap and handlers
   * props will be ignored
   */
  allowChanges: _propTypes.default.bool,

  /**
   * Whether this is the root HotKeys node - this enables some special behaviour
   */
  root: _propTypes.default.bool
};

function provideWithContext(HotKeysEnabled) {
  return (0, _backwardsCompatibleContext.default)(HotKeysEnabled, {
    deprecatedAPI: {
      contextTypes: {
        hotKeysParentId: _propTypes.default.number
      },
      childContextTypes: {
        hotKeysParentId: _propTypes.default.number
      }
    },
    newAPI: {
      contextType: {
        hotKeysParentId: undefined
      }
    }
  });
}
/**
 * Wraps a React component in a HotKeysEnabled component, which passes down the
 * callbacks and options necessary for React Hotkeys to work as a single prop value,
 * hotkeys. These must be unwrapped and applied to a DOM-mountable element within
 * the wrapped component (e.g. div, span, input, etc) in order for the key events
 * to be recorded.
 *
 * @param {React.ComponentClass} Component - Component class to wrap
 * @param {Object} hotKeysOptions - Options that become the wrapping component's
 *                 default prop values
 * @returns {React.ComponentClass} Wrapped component that is passed all of the React hotkeys
 * props in a single value, hotkeys.
 */


function componentFactory(Component) {
  var _class, _temp;

  var hotKeysOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  /**
   * Component that listens to key events when one of its children are in focus and
   * selectively triggers actions (that may be handled by handler functions) when a
   * sequence of events matches a list of pre-defined sequences or combinations
   * @class
   */
  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(HotKeysEnabled, _PureComponent);

    function HotKeysEnabled(props) {
      var _this;

      _classCallCheck(this, HotKeysEnabled);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(HotKeysEnabled).call(this, props));
      _this._manager = new _FocusOnlyComponentManager.default(hotKeysOptions, props);
      return _this;
    }

    _createClass(HotKeysEnabled, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._manager.addHotKeys(this.context.hotKeysParentId);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this._manager.updateHotKeys(this.props);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this._manager.removeKeyMap(this.props);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            keyMap = _this$props.keyMap,
            handlers = _this$props.handlers,
            allowChanges = _this$props.allowChanges,
            root = _this$props.root,
            props = _objectWithoutProperties(_this$props, ["keyMap", "handlers", "allowChanges", "root"]);

        return _react.default.createElement(Component, _extends({
          hotKeys: this._manager.getComponentProps(this.props)
        }, props));
      }
    }]);

    return HotKeysEnabled;
  }(_react.PureComponent), _defineProperty(_class, "propTypes", propTypes), _temp;
}

function withHotKeys(Component) {
  var hotKeysOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return provideWithContext(componentFactory(Component, hotKeysOptions));
}

var _default = withHotKeys;
exports.default = _default;