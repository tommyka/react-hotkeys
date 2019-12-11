function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import lazyLoadAttribute from '../../utils/object/lazyLoadAttribute';
/**
 * Manages the incrementing of a globally unique event id
 * @class
 */

var KeyEventCounter =
/*#__PURE__*/
function () {
  function KeyEventCounter() {
    _classCallCheck(this, KeyEventCounter);
  }

  _createClass(KeyEventCounter, null, [{
    key: "incrementId",

    /**
     * Increment the current event id
     */
    value: function incrementId() {
      this._id = this.id + 1;
    }
  }, {
    key: "id",

    /**
     * Globally unique event id
     * @typedef {number} EventId
     */

    /**
     * Get the current event id
     * @returns {EventId} The current event ID
     */
    get: function get() {
      lazyLoadAttribute(this, '_id', 0);
      return this._id;
    }
  }]);

  return KeyEventCounter;
}();

export default KeyEventCounter;