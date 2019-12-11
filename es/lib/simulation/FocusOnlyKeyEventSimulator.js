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

import AbstractKeyEventSimulator from './AbstractKeyEventSimulator';
import Configuration from '../config/Configuration';
import KeyEventCounter from '../listening/KeyEventCounter';
import KeyEventType from '../../const/KeyEventType';

var FocusOnlyKeyEventSimulator =
/*#__PURE__*/
function (_AbstractKeyEventSimu) {
  _inherits(FocusOnlyKeyEventSimulator, _AbstractKeyEventSimu);

  function FocusOnlyKeyEventSimulator() {
    _classCallCheck(this, FocusOnlyKeyEventSimulator);

    return _possibleConstructorReturn(this, _getPrototypeOf(FocusOnlyKeyEventSimulator).apply(this, arguments));
  }

  _createClass(FocusOnlyKeyEventSimulator, [{
    key: "handleKeyPressSimulation",
    value: function handleKeyPressSimulation(options) {
      this._handleEventSimulation('keypressEventsToSimulate', 'simulatePendingKeyPressEvents', _objectSpread({
        eventType: KeyEventType.keypress
      }, options));
    }
  }, {
    key: "handleKeyUpSimulation",
    value: function handleKeyUpSimulation(options) {
      this._handleEventSimulation('keyupEventsToSimulate', 'simulatePendingKeyUpEvents', _objectSpread({
        eventType: KeyEventType.keyup
      }, options));
    }
  }, {
    key: "_handleEventSimulation",
    value: function _handleEventSimulation(listName, handlerName, _ref) {
      var event = _ref.event,
          eventType = _ref.eventType,
          key = _ref.key,
          focusTreeId = _ref.focusTreeId,
          componentId = _ref.componentId,
          options = _ref.options;

      if (this._shouldSimulate(eventType, key) && Configuration.option('simulateMissingKeyPressEvents')) {
        /**
         * If a key does not have a keypress event, we save the details of the keydown
         * event to simulate the keypress event, as the keydown event bubbles through
         * the last focus-only HotKeysComponent
         */
        var _event = this.cloneAndMergeEvent(event, {
          key: key,
          simulated: true
        });

        this[listName].push({
          event: _event,
          focusTreeId: focusTreeId,
          componentId: componentId,
          options: options
        });
      }

      if (this._keyEventStrategy.componentList.isRoot(componentId) || this._keyEventStrategy.eventPropagator.isStopped()) {
        if (this._shouldSimulateEventsImmediately()) {
          this._keyEventStrategy[handlerName]();
        }
        /**
         * else, we wait for keydown event to propagate through global strategy
         * before we simulate the keypress
         */

      }
    }
  }, {
    key: "simulatePendingKeyPressEvents",
    value: function simulatePendingKeyPressEvents() {
      this._simulatePendingKeyEvents('keypressEventsToSimulate', 'handleKeyPress');
    }
  }, {
    key: "simulatePendingKeyUpEvents",
    value: function simulatePendingKeyUpEvents() {
      this._simulatePendingKeyEvents('keyupEventsToSimulate', 'handleKeyUp');
    }
  }, {
    key: "_simulatePendingKeyEvents",
    value: function _simulatePendingKeyEvents(listName, handlerName) {
      var _this = this;

      if (this[listName].length > 0) {
        KeyEventCounter.incrementId();
      }

      this[listName].forEach(function (_ref2) {
        var event = _ref2.event,
            focusTreeId = _ref2.focusTreeId,
            componentId = _ref2.componentId,
            options = _ref2.options;

        _this._keyEventStrategy[handlerName](event, focusTreeId, componentId, options);
      });
      this[listName] = [];
    }
  }, {
    key: "_shouldSimulateEventsImmediately",
    value: function _shouldSimulateEventsImmediately() {
      return this._keyEventStrategy.shouldSimulateEventsImmediately();
    }
  }]);

  return FocusOnlyKeyEventSimulator;
}(AbstractKeyEventSimulator);

export default FocusOnlyKeyEventSimulator;