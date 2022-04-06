"use strict";
exports.__esModule = true;
exports.Queue = void 0;
var Queue = /** @class */ (function () {
    function Queue() {
        this._store = [];
    }
    Queue.prototype.push = function (val) {
        this._store.push(val);
    };
    Queue.prototype.pop = function () {
        return this._store.shift();
    };
    Queue.prototype.isEmpty = function () {
        if (this._store.length == 0)
            return true;
        else
            return false;
    };
    return Queue;
}());
exports.Queue = Queue;
