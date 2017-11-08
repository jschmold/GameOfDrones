"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqrt = Math.sqrt;
var abs = Math.abs;
var pow = Math.pow;
var min = Math.min;
var absDif = function (num1, num2) { return abs(num1 - num2); };
exports.pushOutput = function (line) { return print(line); };
exports.getInputs = function (reader) {
    if (reader === void 0) { reader = readline; }
    return reader().split(' ');
};
exports.filterGetInputs = function (filterFunc) { return exports.getInputs().filter(function (elem) { return filterFunc(elem); }); };
exports.getIntegerInputs = function () { return exports.filterGetInputs(parseInt); };
exports.getFloatInputs = function () { return exports.filterGetInputs(parseFloat); };
