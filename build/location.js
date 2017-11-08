"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A basic container for an X, Y system, including some utilities.
 * @class Location
 */
var Location = (function () {
    function Location(x, y) {
        this._x = x;
        this._y = y;
    }
    /**
     * Output a Location object as a pair of space-separated integers
     * @param loc The object to output
     */
    Location.toOutput = function (loc) {
        return loc._x + " " + loc._y;
    };
    /**
     * Get the distance between two locations
     * @param loc1 First location
     * @param loc2 Second location
     */
    Location.distance = function (loc1, loc2) {
        var x = Math.abs(loc1._x - loc2._x);
        var y = Math.abs(loc2._y - loc2._y);
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };
    /**
     * Which of the locations is closest to the pos variable
     * @param pos The position to do the comparison on
     * @param args The array of locations to check
     */
    Location.closest = function (pos) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var ret = args[0];
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var loc = args_1[_a];
            if (Location.distance(pos, loc) < Location.distance(pos, ret))
                ret = loc;
        }
        return ret;
    };
    /**
     * Update both the X and Y coordinates of a location object
     * @param x new X Coordinate
     * @param y new Y Coordinate
     */
    Location.prototype.update = function (x, y) {
        this.X = x;
        this.Y = y;
    };
    /**
     * Checks if the x and y values of each location are the same
     * @param loc1
     * @param loc2
     */
    Location.equals = function (loc1, loc2) {
        return loc1.X == loc2.X && loc1.Y == loc2.Y;
    };
    Object.defineProperty(Location.prototype, "X", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            if (this._x != x)
                this._x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Location.prototype, "Y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            if (this._y != y)
                this._y = y;
        },
        enumerable: true,
        configurable: true
    });
    return Location;
}());
exports.Location = Location;
