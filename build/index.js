"use strict";
// Index File Start
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./game");
var g = new game_1.Game();
while (true) {
    g.UpdateZones();
    g.UpdateDrones();
    g.Think();
    g.MakeMove();
}
// Index File End 
