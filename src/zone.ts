import { Location } from './location'
import { Drone } from './drone'
import { Game } from './game'
import * as EventEmitter from "events"


/**
 * A single zone that drones are supposed to try and maintain control of
 * @class Zone
 */
export class Zone extends EventEmitter {
    /** The location of the Zone */
    private _position: Location
    /** The id of the player controlling the zone */
    private _controller: number
    /** The event emitter for this zone object */
    private _ZoneEventEmitter: EventEmitter
    /** The friendly drones occupying a zone */
    private OccupyingDrones: Array<Drone>
    /** The drones moving to occupy a zonne */
    private IncomingDrones: Array<Drone>
    
    set Controller(controller: number) {
        if(this._controller != controller) {
            this.ZoneControlChanged()
            this._controller = controller
        }
    }
    get Controller(): number {
        return this._controller
    }
    get Position(): Location {
        return this._position
    }

    /**
     * Create a new Zone
     * @param xCoor The x coordinate of the zone
     * @param yCoor The y coordinate of the zone
     */
    constructor(xCoor: number, yCoor: number) {
        super()
        this._position = {_x: xCoor, _y: yCoor} as Location
        this._controller = -1
        this._ZoneEventEmitter = new EventEmitter()
    }

    /**
     * Checks if the drone is not already in the list, that the drone is actually enroute, and adds it to the list.
     * Starts listening to the drone's arrival.
     * @param drone 
     */
    AddIncomingDrone(drone: Drone) {
        this.IncomingDrones.indexOf(drone) == -1 && this.Position == drone.Destination && this.IncomingDrones.push(drone)
        drone.on('ArrivedAtDestination', this.AddOccupyingDrone)
    }

    /**
     * Removes a drone from the incoming drones list
     * @param drone The drone to remove
     */
    RemoveIncomingDrone(drone: Drone) {
        this.IncomingDrones = this.IncomingDrones.filter(dr => dr !== drone)
    }

    /**
     * Checks if the drone is incoming, and removes it from the incoming if it is.
     * Checks if the drone is actually within the 100 unit radius of control, then if that passes, it adds it to the Occupying array
     * @param drone The drone to add to those occupying this zone
     */
    AddOccupyingDrone(drone: Drone) {
        drone.Destination == this.Position && this.RemoveIncomingDrone(drone)
        Location.distance(drone.Position, this.Position) <= 100 && this.OccupyingDrones.indexOf(drone) == -1 && this.OccupyingDrones.push(drone)
    }

    /**
     * Removes a drone from the array of drones that are currently occupying this zone
     * @param drone The drone to remove
     */
    RemoveOccupyingDrone(drone: Drone) {
        this.OccupyingDrones = this.OccupyingDrones.filter(dr => dr !== drone)
    }


    /**
     * Fires the event for zone control changing, and checks if we gained control or lost it, and throws the necessary event if appropriate
     * @fires ZoneControlChanged
     * @fires ZonePowerLost
     * @fires ZonePowerGained
     */
    private ZoneControlChanged() {
        this.emit('ZoneControlChanged', this.Controller)
        if(this.Controller != Game.Id)
            this.emit('ZonePowerLost')
        else
            this.emit('ZonePowerGained')
    }
}