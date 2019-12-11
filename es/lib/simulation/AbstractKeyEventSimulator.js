function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import ModifierFlagsDictionary from '../../const/ModifierFlagsDictionary';
import hasKeyPressEvent from '../../helpers/resolving-handlers/hasKeyPressEvent';
import KeyEventType from '../../const/KeyEventType';
import keyupIsHiddenByCmd from '../../helpers/resolving-handlers/keyupIsHiddenByCmd';

var AbstractKeyEventSimulator =
/*#__PURE__*/
function () {
  function AbstractKeyEventSimulator(keyEventStrategy) {
    _classCallCheck(this, AbstractKeyEventSimulator);

    this._keyEventStrategy = keyEventStrategy;
    this.clear();
  }

  _createClass(AbstractKeyEventSimulator, [{
    key: "clear",
    value: function clear() {
      this.keypressEventsToSimulate = [];
      this.keyupEventsToSimulate = [];
    }
  }, {
    key: "cloneAndMergeEvent",
    value: function cloneAndMergeEvent(event, extra) {
      var eventAttributes = Object.keys(ModifierFlagsDictionary).reduce(function (memo, eventAttribute) {
        memo[eventAttribute] = event[eventAttribute];
        return memo;
      }, {});
      return _objectSpread({}, eventAttributes, extra);
    }
  }, {
    key: "_shouldSimulate",
    value: function _shouldSimulate(eventType, keyName) {
      var keyHasNativeKeyPress = hasKeyPressEvent(keyName);
      var currentCombination = this._keyEventStrategy.currentCombination;

      if (eventType === KeyEventType.keypress) {
        return !keyHasNativeKeyPress || keyHasNativeKeyPress && currentCombination.isKeyStillPressed('Meta');
      } else if (eventType === KeyEventType.keyup) {
        return keyupIsHiddenByCmd(keyName) && currentCombination.isKeyReleased('Meta');
      }

      return false;
    }
  }]);

  return AbstractKeyEventSimulator;
}();

export default AbstractKeyEventSimulator;