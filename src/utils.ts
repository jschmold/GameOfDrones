import { Location } from "./location"

let sqrt = Math.sqrt
let abs = Math.abs
let pow = Math.pow
let min = Math.min

let absDif = (num1: number, num2: number) => abs(num1 - num2)

declare let readline: any
declare let print: any
declare let printErr: any

export let pushOutput = (line: string) => print(line)
export let pushError = (line: string) => printErr(line)
export let getInputs = (reader = readline) => reader().split(' ')
export let filterGetInputs = (filterFunc) => getInputs().filter(elem => filterFunc(elem))
export let getIntegerInputs = () => filterGetInputs((val) => parseInt(val, 10))