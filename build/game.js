"use strict";
/**
 * Things I want it to do:
 *  Halve the drones and send each half of the drones to the closest 2 zones on start
 *  If a zone is lost, send the closest drone to it to overtake.
 *      If when the zone is not gained when the drone arrives, send 1 more -- Repeat until done
 *  If a zone is gained, send all but 1 drone to the other zones if ZoneCount <= (DroneCount - ZoneCount), else send all to next zone
 *  If enemy takes a zone, move a drone to the closest-owned zone to prevent losing that one
 *
 * @todo Listen to "arrived" events when the destination is a zone, and add the drone to the friendlyDronesOccupying
 */
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
// Game File Start
var utils_1 = require("./utils");
var drone_1 = require("./drone");
var zone_1 = require("./zone");
var location_1 = require("./location");
var EventEmitter = require("events");
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        var inputs = utils_1.getIntegerInputs();
        _this._PlayerCount = inputs[0];
        Game._Id = inputs[1];
        _this.Drones = new drone_1.Drone[inputs[2]]();
        var zoneCount = inputs[3];
        for (var i = 0; i < zoneCount; i++) {
            var inputs_1 = utils_1.getIntegerInputs();
            _this.Zones.push(new zone_1.Zone(inputs_1[0], inputs_1[1]));
        }
        return _this;
    }
    Object.defineProperty(Game, "Id", {
        get: function () {
            return this._Id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "PlayerCount", {
        get: function () {
            return this._PlayerCount;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The "Think" function.
     */
    Game.prototype.Think = function () {
        // I am trying to express
        // Send the closest drones to the closest respective unoccupied, or uncontrolled zones
        // Only act on the drones that do not have a task
        var unUsedDrones = this.Drones.filter(function (drone) { return !drone.Destination; });
        var zoneToDroneRatio = Math.round(this.Zones.length / this.Drones.length);
        var _loop_1 = function (zone) {
            drone_1.Drone.closestDrones(zone.Position, Math.min(1, zoneToDroneRatio), unUsedDrones)
                .forEach(function (drone) { return drone.Destination = zone.Position; });
        };
        // This is saying "Of the drones I am not controlling, send the drones that don't have a task to it"
        for (var _i = 0, _a = this.Zones.filter(function (zone) { return zone.Controller != Game.Id; }); _i < _a.length; _i++) {
            var zone = _a[_i];
            _loop_1(zone);
        }
    };
    /*
     * Output each drone's intended destination
     */
    Game.prototype.MakeMove = function () {
        this.Drones.forEach(function (drone) { return utils_1.pushOutput(location_1.Location.toOutput(drone.Destination)); });
    };
    /*
     *  UpdateDrones: Used during a turn's input phase to gather all the drone's new locations
     */
    Game.prototype.UpdateDrones = function () {
        for (var _i = 0, _a = this.Drones; _i < _a.length; _i++) {
            var drone = _a[_i];
            var inputs = utils_1.getIntegerInputs();
            drone.Position.update(inputs[0], inputs[1]);
        }
    };
    /*
     * UpdateZones: Used during a turn's input phase to gather all the zone's controllers'
     */
    Game.prototype.UpdateZones = function () {
        for (var _i = 0, _a = this.Zones; _i < _a.length; _i++) {
            var zone = _a[_i];
            var inputs = utils_1.getIntegerInputs();
            zone.Controller = inputs[0];
        }
    };
    return Game;
}(EventEmitter));
exports.Game = Game;
