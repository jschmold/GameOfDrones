/**
 * A basic container for an X, Y system, including some utilities.
 * @class Location
 */
export class Location {
    _x: number
    _y: number
    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }
    /**
     * Output a Location object as a pair of space-separated integers
     * @param loc The object to output
     */
    static toOutput(loc: Location) {
        return `${loc._x} ${loc._y}`
    }
    /**
     * Get the distance between two locations
     * @param loc1 First location
     * @param loc2 Second location
     */
    isSet(): boolean {
        return this.X == null || this.Y == null
    }
    static distance(loc1: Location, loc2: Location) {
        let x = Math.abs(loc1._x - loc2._x)
        let y = Math.abs(loc2._y - loc2._y)
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    }

    /**
     * Which of the locations is closest to the pos variable
     * @param pos The position to do the comparison on
     * @param args The array of locations to check
     */
    static closest(pos: Location, ... args: Array<Location>):Location {
        let ret: Location = args[0]
        for(let loc of args) 
            if(Location.distance(pos, loc) < Location.distance(pos, ret))
                ret = loc
        return ret
    }
    /**
     * Update both the X and Y coordinates of a location object
     * @param x new X Coordinate
     * @param y new Y Coordinate
     */
    update(x: number, y:number) {
        this.X = x
        this.Y = y
    }
    /**
     * Checks if the x and y values of each location are the same
     * @param loc1
     * @param loc2 
     */
    static equals(loc1: Location, loc2: Location) {
        return loc1.X == loc2.X && loc1.Y == loc2.Y
    }
    set X(x:number) {
        if(this._x != x)
            this._x = x
    }
    get X(): number {
        return this._x
    }
    set Y(y: number) {
        if(this._y != y)
            this._y = y
    }
    get Y(): number {
        return this._y
    }
}