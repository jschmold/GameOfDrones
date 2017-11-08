var {closerLoc, getInputs} = require('../build/utils')
var assert = require('assert')
var _ = require("lodash")
describe("Utilities", function() {
    describe("#CloserLoc", function() {
        it('works', function() {
            var loc1 = {x: 20, y: 20}
            var loc2 = {x: 30, y: 30}
            var dest = {x: 5, y: 5}
            var closer = closerLoc(dest, loc1, loc2)
            assert.equal(closer, loc1, 'Closer should be ' + JSON.stringify(loc1) + ' is ' + JSON.stringify(closer))
        })
    })
    describe('#getInputs', function() {
        it('Gets space separated values', function() {
            let ret = getInputs(() => 'arg arg1 arg2')
            assert(_.isEqual(ret.sort(), ['arg', 'arg1', 'arg2'].sort()), 'Did not read inputs correctly: ' + ret)
        })
    })
})