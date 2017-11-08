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
var game_1 = require("./game");
var EventEmitter = require("events");
/**
 * A single zone that drones are supposed to try and maintain control of
 * @class Zone
 */
var Zone = (function (_super) {
    __extends(Zone, _super);
    /**
     * Create a new Zone
     * @param xCoor The x coordinate of the zone
     * @param yCoor The y coordinate of the zone
     */
    function Zone(xCoor, yCoor) {
        var _this = _super.call(this) || this;
        _this._position = { _x: xCoor, _y: yCoor };
        _this._controller = -1;
        _this._ZoneEventEmitter = new EventEmitter();
        return _this;
    }
    Object.defineProperty(Zone.prototype, "Controller", {
        get: function () {
            return this._controller;
        },
        set: function (controller) {
            if (this._controller != controller) {
                this.ZoneControlChanged();
                this._controller = controller;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Zone.prototype, "Position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if the drone is not already in the list, that the drone is actually enroute, and adds it to the list.
     * Starts listening to the drone's arrival.
     * @param drone
     */
    Zone.prototype.AddIncomingDrone = function (drone) {
        this.IncomingDrones.indexOf(drone) == -1 && this.Position == drone.Destination && this.IncomingDrones.push(drone);
        drone.on('ArrivedAtDestination', this.AddOccupyingDrone);
    };
    /**
     * Removes a drone from the incoming drones list
     * @param drone The drone to remove
     */
    Zone.prototype.RemoveIncomingDrone = function (drone) {
        this.IncomingDrones = this.IncomingDrones.filter(function (dr) { return dr !== drone; });
    };
    /**
     * Checks if the drone is incoming, and removes it from the incoming if it is.
     * Checks if the drone is actually within the 100 unit radius of control, then if that passes, it adds it to the Occupying array
     * @param drone The drone to add to those occupying this zone
     */
    Zone.prototype.AddOccupyingDrone = function (drone) {
        drone.Destination == this.Position && this.RemoveIncomingDrone(drone);
        location_1.Location.distance(drone.Position, this.Position) <= 100 && this.OccupyingDrones.indexOf(drone) == -1 && this.OccupyingDrones.push(drone);
    };
    /**
     * Removes a drone from the array of drones that are currently occupying this zone
     * @param drone The drone to remove
     */
    Zone.prototype.RemoveOccupyingDrone = function (drone) {
        this.OccupyingDrones = this.OccupyingDrones.filter(function (dr) { return dr !== drone; });
    };
    /**
     * Fires the event for zone control changing, and checks if we gained control or lost it, and throws the necessary event if appropriate
     * @fires ZoneControlChanged
     * @fires ZonePowerLost
     * @fires ZonePowerGained
     */
    Zone.prototype.ZoneControlChanged = function () {
        this.emit('ZoneControlChanged', this.Controller);
        if (this.Controller != game_1.Game.Id)
            this.emit('ZonePowerLost');
        else
            this.emit('ZonePowerGained');
    };
    return Zone;
}(EventEmitter));
exports.Zone = Zone;
