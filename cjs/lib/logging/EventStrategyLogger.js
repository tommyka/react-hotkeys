"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Logger2 = _interopRequireDefault(require("./Logger"));

var _printComponent = _interopRequireDefault(require("../../helpers/logging/printComponent"));

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

var EventStrategyLogger =
/*#__PURE__*/
function (_Logger) {
  _inherits(EventStrategyLogger, _Logger);

  function EventStrategyLogger(logLevel, eventStrategy) {
    var _this;

    _classCallCheck(this, EventStrategyLogger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EventStrategyLogger).call(this, logLevel));
    _this._eventStrategy = eventStrategy;
    return _this;
  }

  _createClass(EventStrategyLogger, [{
    key: "nonKeyEventPrefix",
    value: function nonKeyEventPrefix(componentId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.keyEventPrefix(componentId, _objectSpread({}, options, {
        eventId: false
      }));
    }
  }, {
    key: "logComponentOptions",
    value: function logComponentOptions(componentId, componentOptions) {
      this.verbose(this.nonKeyEventPrefix(componentId), 'New component options:\n', (0, _printComponent.default)(componentOptions));
    }
  }, {
    key: "logKeyHistory",
    value: function logKeyHistory(keyHistory, componentId) {
      this.verbose(this.keyEventPrefix(componentId), "Key history: ".concat((0, _printComponent.default)(keyHistory.toJSON()), "."));
    }
  }]);

  return EventStrategyLogger;
}(_Logger2.default);

var _default = EventStrategyLogger;
exports.default = _default;