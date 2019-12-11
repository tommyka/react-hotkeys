function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import KeyEventCounter from './KeyEventCounter';
import Configuration from '../config/Configuration';
import describeKeyEvent from '../../helpers/logging/describeKeyEvent';
import KeyEventType from '../../const/KeyEventType';
import lazyLoadAttribute from '../../utils/object/lazyLoadAttribute';
/**
 * Handles the propagation of keyboard events up through the React component tree,
 * starting from the hot keys component closest to the event target
 * @class
 */

var EventPropagator =
/*#__PURE__*/
function () {
  /**
   * Create a new instance of EventPropagator
   * @param {ComponentOptionsList} componentList List of options of the components
   *        the event is propagating through
    *        each log entry
   * @returns {EventPropagator}
   */
  function EventPropagator(componentList) {
    _classCallCheck(this, EventPropagator);

    this._componentList = componentList;
    this._previousPropagation = null;

    this._reset();
  }

  _createClass(EventPropagator, [{
    key: "_reset",
    value: function _reset() {
      /**
       * Position of the component that the event last propagated through
       * @type {number}
       */
      this.previousPosition = -1;
      /**
       * Position of the current component the event is propagating through
       * @type {number}
       */

      this._position = -1;
      /**
       * Flag to record whether the keyboard event matches an action whose handler
       * has already been called
       * @type {boolean}
       */

      this._actionHandled = false;
      /**
       * Flag to record whether the keyboard event should be ignored
       * @type {boolean}
       */

      this._ignoreEvent = false;
      /**
       * Flag to record whether the keyboard event current being handled should be
       * observed, even if matches the ignoreEventCondition
       * @type {boolean}
       */

      this._observeIgnoredEvents = false;
      /**
       * Flag to record whether the event is being stopped from further propagation
       * @type {boolean}
       */

      this._stopping = false;
      /**
       * The id of the component the event is current propagating through
       * @type {ComponentId}
       */

      this._componentId = null;
      /**
       * The name of the key the propagating event relates to
       * @type {ReactKeyName}
       */

      this._key = null;
      /**
       * The type of keyboard event that is propagating
       * @type {KeyEventType}
       */

      this._type = null;
    }
    /********************************************************************************
     * New event propagation
     *********************************************************************************/

    /**
     * Whether the current propagation step is the first one
     * @returns {boolean} true if this is the first propagation step
     */

  }, {
    key: "isFirstPropagationStep",
    value: function isFirstPropagationStep() {
      var previousPosition = this.previousPosition;
      return previousPosition === -1 || previousPosition >= this._position;
    }
    /**
     * Whether the propagation is for a particular key
     * @param {ReactKeyName} keyName The name of the key to query
     * @returns {boolean} true if the event propagation is for the key
     */

  }, {
    key: "isForKey",
    value: function isForKey(keyName) {
      return this._key === keyName;
    }
    /**
     * The type of keyboard event that is propagating
     * @param {KeyEventType} keyEventType The type of keyboard event to query
     * @returns {boolean} true if the keyboard event propagating is that type
     */

  }, {
    key: "isForEventType",
    value: function isForEventType(keyEventType) {
      return this._type === keyEventType;
    }
    /********************************************************************************
     * Propagation steps
     *********************************************************************************/

    /**
     * Begin a new propagation step, called as a before callback. i.e. the first thing
     * after an event has propagated to a new hot keys component
     * @param {ComponentId} componentId The id of the component that has just had the
     *        event propagate up to it
     * @param {SyntheticKeyboardEvent} event The actual KeyboardEvent that is propagating
     * @param {ReactKeyName} key The name of the key the event relates to
     * @param {KeyEventType} type The type of keyboard event
     * @returns {boolean} true if the event should be observed, otherwise false if it
     *        should be ignored.
     */

  }, {
    key: "startNewPropagationStep",
    value: function startNewPropagationStep(componentId, event, key, type) {
      this._position = this._componentList.getPositionById(componentId);
      this._componentId = componentId;

      if (this.isFirstPropagationStep()) {
        KeyEventCounter.incrementId();
        this._key = event.key;
        this._type = type;
      }

      if (event.repeat && Configuration.option('ignoreRepeatedEventsWhenKeyHeldDown')) {
        this.logger.debug(this.logger.keyEventPrefix(componentId), "Ignored repeated ".concat(describeKeyEvent(event, key, KeyEventType.keydown), " event."));
        this.ignoreEvent(event);
        return false;
      }

      return true;
    }
    /**
     * Ends handling of a propagation step and performs cleanup. Called as a after callback.
     * @returns {void}
     */

  }, {
    key: "finishPropagationStep",
    value: function finishPropagationStep() {
      if (this.isStopped() || this._componentList.isRoot(this._componentId)) {
        this._previousPropagation = this._clone();

        this._reset();
      } else {
        this.previousPosition = this._position;
      }
    }
    /********************************************************************************
     * Previous propagation
     *********************************************************************************/

    /**
     * The previous event propagation, either for an earlier event type of the same key
     * or a different key's event propagation
     * @type {EventPropagator} The propagator for the previous event propagation
     */

  }, {
    key: "observeIgnoredEvents",

    /********************************************************************************
     * Ignoring events
     *********************************************************************************/

    /**
     * Set the observeIgnoredEvents flag, to observe (not ignore) keyboard events that
     * match the ignored events filter
     * @returns {void}
     */
    value: function observeIgnoredEvents() {
      this._observeIgnoredEvents = true;
    }
    /**
     * Record that an event is being ignored for the rest of its propagation and, if
     * enabled, stop it from further propagation entirely.
     * @param {SyntheticKeyboardEvent} event Event to ignore
     * @returns {boolean} true if the event was stopped from further propagation,
     *          otherwise false.
     */

  }, {
    key: "ignoreEvent",
    value: function ignoreEvent(event) {
      this._ignoreEvent = true;

      if (this.isIgnoringEvent() && Configuration.option('stopEventPropagationAfterIgnoring')) {
        this.logger.debug(this.logger.keyEventPrefix(this._componentId), 'Stopping further event propagation.');
        this.stop(event);
        this.finishPropagationStep();
        return true;
      }

      return false;
    }
    /**
     * Whether to ignore the currently propagating event or not
     * @returns {boolean} true if the event is being ignored for the current propagation
     */

  }, {
    key: "isIgnoringEvent",
    value: function isIgnoringEvent() {
      return !this._observeIgnoredEvents && this._ignoreEvent;
    }
    /********************************************************************************
     * Stopping propagation
     *********************************************************************************/

    /**
     * Whether the event has been stopped from further propagation
     * @returns {boolean} true if the event is being stopped
     */

  }, {
    key: "isStopped",
    value: function isStopped() {
      return this._stopping;
    }
    /**
     * Stop an event from further propagation
     * @param {SyntheticKeyboardEvent} event Event to call stopPropagation() on
     * @returns {boolean} true if the event was stopped and false if it was already
     *          stopped
     */

  }, {
    key: "stop",
    value: function stop(event) {
      if (!this.isStopped()) {
        this._stopping = true; // noinspection JSUnresolvedVariable

        if (!event.simulated) {
          event.stopPropagation();
        }

        return true;
      }

      return false;
    }
    /**
     * Whether the keyboard event has yet propagated to the root hot keys component
     * @returns {boolean} true if it still has hotkeys components to propagate to
     *          before being complete.
     */

  }, {
    key: "isPendingPropagation",
    value: function isPendingPropagation() {
      var previousPosition = this.previousPosition;
      return previousPosition !== -1 && previousPosition + 1 < this._position;
    }
    /**
     * If the action has already been handled
     * @returns {boolean} true if the action has already been handled
     */

  }, {
    key: "isHandled",
    value: function isHandled() {
      return this._actionHandled;
    }
    /**
     * Record that the current propagating event matched and action and its handler
     * has been called.
     * @returns {void}
     */

  }, {
    key: "setHandled",
    value: function setHandled() {
      this._actionHandled = true;
    }
    /********************************************************************************
     * Private methods
     ********************************************************************************/

  }, {
    key: "_clone",
    value: function _clone() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$copyState = _ref.copyState,
          copyState = _ref$copyState === void 0 ? true : _ref$copyState;

      var cloned = new EventPropagator(this._componentList);
      cloned.logger = this.logger;

      if (copyState) {
        Object.assign(cloned, this);
      }

      return cloned;
    }
  }, {
    key: "previousPropagation",
    get: function get() {
      var _this = this;

      return lazyLoadAttribute(this, '_previousPropagation', function () {
        return _this._clone({
          copyState: false
        });
      });
    }
  }]);

  return EventPropagator;
}();

export default EventPropagator;