"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactionListener = /** @class */ (function () {
    function ReactionListener(message, options) {
        this._message = message;
        this._onAdd = options.onAdd;
        this._onRemove = options.onRemove;
        this._onRemoveAll = options.onRemoveAll;
    }
    Object.defineProperty(ReactionListener.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactionListener.prototype, "onAdd", {
        get: function () {
            return this._onAdd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactionListener.prototype, "onRemove", {
        get: function () {
            return this._onRemove;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactionListener.prototype, "onRemoveAll", {
        get: function () {
            return this._onRemoveAll;
        },
        enumerable: true,
        configurable: true
    });
    return ReactionListener;
}());
exports.ReactionListener = ReactionListener;
//# sourceMappingURL=ReactionListener.js.map