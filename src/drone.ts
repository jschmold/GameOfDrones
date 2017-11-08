import { Location } from './location'
import * as EventEmitter from 'events'

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
export class Drone extends EventEmitter {
    /** The current location of the drone */
    private _location: Location
    /** The intended destination of the drone */
    private _destination: Location

    set Position(loc: Location) {
        this._location = loc
        this.emit('PositionChanged')
    }
    get Position(): Location {
        return this._location
    }
    set Destination(loc: Location) {
        this._destination = loc
        this.emit('DestinationChanged')
    }
    get Destination(): Location {
        return this._destination
    }

    /**
     * Create a drone
     * @param startx Starting X Coordinate
     * @param starty Starting Y Coordinate
     * @fires ready
     */
    constructor() {
        super()
        this.Position = new Location(0, 0)
        this.on('ArrivedAtDestination', this.clearDestination)
        this.on('PositionChanged', this.destinationArrivalCheck)
        this.emit('ready')
    }
    /**
     * Sets the destination to null
     * @fires DestinationCleared
     */
    clearDestination() {
        this.Destination = null
        this.emit('DestinationCleared')
    }
    /**
     * Checks if the position and destination are the same, and fires ArrivedAtDestination
     * @fires ArrivedAtDestination
     */
    private destinationArrivalCheck() {
        Location.equals(this.Position, this.Destination) && this.emit('ArrivedAtDestination')
    }

    /**
     * Figures out which of a given set of drones are closest to a specific location
     * @param loc The location to compare the drones against
     * @param amt The max amount of drones to get that are closest
     * @param drones The drones gathered to do the comparison
     */
    static closestDrones(loc: Location, amt: number, drones: Array<Drone>): Array<Drone> {
        // Sort the arrays by closest to location, then slice the first amt
        return drones.sort((drA, drB) => {
            let ret = Location.closest(loc, drA.Position, drB.Position)
            if(ret == drA.Position)
                return -1
            if(ret == drB.Position)
                return 1
            return 0
        }).slice(0, amt)
    }
}
