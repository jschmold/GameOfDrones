import * as utils from "./utils"
import { Game } from './game'

var g = new Game()
while(true) {
    g.UpdateZones()
    g.UpdateDrones()
    g.Think()
    g.MakeMove()
}