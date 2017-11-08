var assert = require('assert')
var {Drone} = require('../build/drone')
var _ = require('lodash')
describe('Drone', function() {
    describe('#ClosestDrones', function() {
        it('Returns expected results', function() {
            let dra = new Drone(30, 20)
            let drb = new Drone(50, 50)
            let drc = new Drone(100, 100)
            let loc = {x: 10, y: 10}
            let result = Drone.ClosestDrones(loc, 1, [dra, drb])
            assert(_.isEqual(result, [dra].sort()), 'Did not return expected val, instead: ' + JSON.stringify(result))
        })
    })
})