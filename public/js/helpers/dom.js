define(function() {
    "use strict";
    var hasChild, removeChildren;

    hasChild = function(parent, childSelector) {
        return parent.querySelectorAll(childSelector).length;
    };

    removeChildren = function(parent, childSelector) {
        var children, i, len;

        children = parent.querySelectorAll(childSelector);
        for (i = 0, len = children.length; i < len; i++) {
            parent.removeChild(children[i]);
        }
    };

    return {
        hasChild: hasChild,
        removeChildren: removeChildren
    };
});
