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


// Game File Start
import { 
    getIntegerInputs, 
    pushOutput,
    pushError,
    getInputs
} from "./utils"
import { Drone } from "./drone"
import { Zone } from './zone'
import { Location } from './location'
import * as EventEmitter from 'events'

export class Game extends EventEmitter {
    private _PlayerCount: number
    private static _Id: number
    private Drones: Drone[]
    private Zones: Zone[]

    static get Id(): number {
        return this._Id
    }

    get PlayerCount(): number {
        return this._PlayerCount
    }
    constructor() {
        super()
        let inputs = getInputs()
        pushError(inputs)

        this._PlayerCount = inputs[0]
        Game._Id = inputs[1]
        this.Drones = [] 
        this.Zones = []
        let droneCount = inputs[2]
        for(let i = 0; i < droneCount; i++) {
            this.Drones.push(new Drone())
        }
        let zoneCount = inputs[3]
        for (let i = 0; i < zoneCount; i++) {
            let inputs = getIntegerInputs()
            this.Zones.push(new Zone(inputs[0], inputs[1]))
        }
        pushError(`Zone count: ${this.Zones.length} vs ${zoneCount}`)
        pushError(`Drone count: ${this.Drones.length} vs ${droneCount}`)
    }

    /**
     * The "Think" function. 
     */
    Think() {        
        // I am trying to express
        // Send the closest drones to the closest respective unoccupied, or uncontrolled zones
        // Only act on the drones that do not have a task
        let zoneToDroneRatio = Math.round(this.Zones.length / this.Drones.length)
        // This is saying "Of the drones I am not controlling, send the drones that don't have a task to it"
        for(let zone of this.Zones.filter(zone => zone.Controller != Game.Id)) {
            let unUsedDrones = this.Drones.filter(drone => !drone.Destination)
            Drone.closestDrones(zone.Position, Math.min(1, zoneToDroneRatio), unUsedDrones)
                .forEach(drone => drone.Destination = zone.Position)
        }
    }

    /*
     * Output each drone's intended destination
     */
    MakeMove() {
        this.Drones.forEach(
            (drone) => pushOutput(Location.toOutput(drone.Destination || drone.Position))
        )
    }

    /*
     *  UpdateDrones: Used during a turn's input phase to gather all the drone's new locations
     */
    UpdateDrones() {
        for(let drone of this.Drones) {
            let inputs = getIntegerInputs()
            drone.Position.update(inputs[0], inputs[1])
        }
    }

    /*
     * UpdateZones: Used during a turn's input phase to gather all the zone's controllers'
     */
    UpdateZones() {
        for(let zone of this.Zones) {
            let inputs = getIntegerInputs()
            zone.Controller = inputs[0]
        }
    }
}
