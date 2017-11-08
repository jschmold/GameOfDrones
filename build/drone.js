"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var location_1 = require("./location");
var EventEmitter = require("events");
/**
 * A drone instance that is either self-controlling, or receiving instructions from the director.
 *
 * Events:
 *  - ArrivedAtDestination
 *  - ready
 *  - DestinationCleared
 *  - PositionChanged
 * @class Drone
 * @todo Add an event for arriving at a destination
 * @event {ArrivedAtDestination}
 */
var Drone = (function (_super) {
    __extends(Drone, _super);
    /**
     * Create a drone
     * @param startx Starting X Coordinate
     * @param starty Starting Y Coordinate
     * @fires ready
     */
    function Drone(startx, starty) {
        var _this = _super.call(this) || this;
        _this.Position = { _x: startx, _y: starty };
        _this.on('ArrivedAtDestination', _this.clearDestination);
        _this.on('PositionChanged', _this.destinationArrivalCheck);
        _this.emit('ready');
        return _this;
    }
    Object.defineProperty(Drone.prototype, "Position", {
        get: function () {
            return this._location;
        },
        set: function (loc) {
            this._location = loc;
            this.emit('PositionChanged');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drone.prototype, "Destination", {
        get: function () {
            return this._destination;
        },
        set: function (loc) {
            this._destination = loc;
            this.emit('DestinationChanged');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the destination to null
     * @fires DestinationCleared
     */
    Drone.prototype.clearDestination = function () {
        this.Destination = null;
        this.emit('DestinationCleared');
    };
    /**
     * Checks if the position and destination are the same, and fires ArrivedAtDestination
     * @fires ArrivedAtDestination
     */
    Drone.prototype.destinationArrivalCheck = function () {
        location_1.Location.equals(this.Position, this.Destination) && this.emit('ArrivedAtDestination');
    };
    /**
     * Figures out which of a given set of drones are closest to a specific location
     * @param loc The location to compare the drones against
     * @param amt The max amount of drones to get that are closest
     * @param drones The drones gathered to do the comparison
     */
    Drone.closestDrones = function (loc, amt, drones) {
        // Sort the arrays by closest to location, then slice the first amt
        return drones.sort(function (drA, drB) {
            var ret = location_1.Location.closest(loc, drA.Position, drB.Position);
            if (ret == drA.Position)
                return -1;
            if (ret == drA.Position)
                return 1;
            return 0;
        }).slice(0, amt);
    };
    return Drone;
}(EventEmitter));
exports.Drone = Drone;
