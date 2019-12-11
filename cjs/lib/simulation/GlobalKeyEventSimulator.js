"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractKeyEventSimulator = _interopRequireDefault(require("./AbstractKeyEventSimulator"));

var _Configuration = _interopRequireDefault(require("../config/Configuration"));

var _KeyEventType = _interopRequireDefault(require("../../const/KeyEventType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GlobalKeyEventSimulator =
/*#__PURE__*/
function (_AbstractKeyEventSimu) {
  _inherits(GlobalKeyEventSimulator, _AbstractKeyEventSimu);

  function GlobalKeyEventSimulator() {
    _classCallCheck(this, GlobalKeyEventSimulator);

    return _possibleConstructorReturn(this, _getPrototypeOf(GlobalKeyEventSimulator).apply(this, arguments));
  }

  _createClass(GlobalKeyEventSimulator, [{
    key: "handleKeyPressSimulation",
    value: function handleKeyPressSimulation(options) {
      this._handleEventSimulation('handleKeyPress', _objectSpread({
        eventType: _KeyEventType.default.keypress
      }, options));
    }
  }, {
    key: "handleKeyUpSimulation",
    value: function handleKeyUpSimulation(options) {
      this._handleEventSimulation('handleKeyUp', _objectSpread({
        eventType: _KeyEventType.default.keyup
      }, options));
    }
  }, {
    key: "_handleEventSimulation",
    value: function _handleEventSimulation(handlerName, _ref) {
      var event = _ref.event,
          eventType = _ref.eventType,
          key = _ref.key;

      if (this._shouldSimulate(eventType, key) && _Configuration.default.option('simulateMissingKeyPressEvents')) {
        /**
         * If a key does not have a keypress event, we simulate one immediately after
         * the keydown event, to keep the behaviour consistent across all keys
         */
        var _event = this.cloneAndMergeEvent(event, {
          key: key,
          simulated: true
        });

        this._keyEventStrategy[handlerName](_event);
      }
    }
  }]);

  return GlobalKeyEventSimulator;
}(_AbstractKeyEventSimulator.default);

var _default = GlobalKeyEventSimulator;
exports.default = _default;