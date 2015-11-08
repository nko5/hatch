define(function() {
    "use strict";
    var exports;

    /**
     * Abstracts away some fiddlings with DOM.
     *
     * @module helper/dom
     */
    exports = {};

    /**
     * Checks, whether parent has at least one child with given selector
     *
     * @param {HTMLElement} parent - A container DOM element
     * @param {String} childSelector - All children share this selector
     * @returns {Number} The number of children.
     */
    exports.hasChild = function(parent, childSelector) {
        return parent.querySelectorAll(childSelector).length;
    };

    /**
     * Remove all children with given selector from parent.
     *
     * @param {HTMLElement} parent - A container DOM element
     * @param {String} childSelector - All children share this selector
     */
    exports.removeChildren = function(parent, childSelector) {
        var children, i, len;

        children = parent.querySelectorAll(childSelector);
        for (i = 0, len = children.length; i < len; i++) {
            parent.removeChild(children[i]);
        }
    };

    return exports;
});
