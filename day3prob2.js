/*
--- Day 3: Crossed Wires ---
--- Part Two ---
It turns out that this circuit is very timing-sensitive; you actually need to minimize the signal delay.

To do this, calculate the number of steps each wire takes to reach each intersection; choose the intersection where the sum of both wires' steps is lowest. If a wire visits a position on the grid multiple times, use the steps value from the first time it visits that position when calculating the total value of a specific intersection.

The number of steps a wire takes is the total number of grid squares the wire has entered to get to that location, including the intersection being considered. Again consider the example from above:

...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........
In the above example, the intersection closest to the central port is reached after 8+5+5+2 = 20 steps by the first wire and 7+6+4+3 = 20 steps by the second wire for a total of 20+20 = 40 steps.

However, the top-right intersection is better: the first wire takes only 8+5+2 = 15 and the second wire takes only 7+6+2 = 15, a total of 15+15 = 30 steps.

Here are the best steps for the extra examples from above:

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83 = 610 steps
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = 410 steps
What is the fewest combined steps the wires must take to reach an intersection?
*/

const fs = require('fs')
const input = fs.readFileSync('day3-input.txt', 'utf8').split('\n')

const calcShortestSteps = ([pathWire1, pathWire2]) => {
  const locationsWire1 = []
  const locationsWire2 = []

  const addLocations = (path, locations) => {
    let x = 0
    let y = 0

    const arrPath = Array.isArray(path) ? path : path.split(',')

    arrPath.map(move => {
      const direction = move.slice(0, 1)
      const distance = Number(move.slice(1))

      switch (direction) {
        case 'R':
          ;[...Array(distance)].forEach(() => {
            locations.push(`${x++},${y}`)
          })
          break
        case 'L':
          ;[...Array(distance)].forEach(() => {
            locations.push(`${x--},${y}`)
          })
          break
        case 'U':
          ;[...Array(distance)].forEach(() => {
            locations.push(`${x},${y++}`)
          })
          break
        case 'D':
          ;[...Array(distance)].forEach(() => {
            locations.push(`${x},${y--}`)
          })
          break
      }
    })
  }

  // add locations along paths
  addLocations(pathWire1, locationsWire1)
  addLocations(pathWire2, locationsWire2)
  // get common locations (Set intersection)
  const intersections = new Set(
    [...locationsWire1].filter(val => locationsWire2.includes(val))
  )
  // check all intersections to find the shortest number of steps for both wires
  return [...intersections].reduce((shortest, point) => {
    const steps = locationsWire1.indexOf(point) + locationsWire2.indexOf(point)
    return steps > 0 && steps < shortest ? steps : shortest
  }, locationsWire1.length + locationsWire2.length)
}

const exInput1 = [['R8', 'U5', 'L5', 'D3'], ['U7', 'R6', 'D4', 'L4']]
const exInput2 = [
  ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
  ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'],
]
const exInput3 = [
  ['R98', 'U47', 'R26', 'D63', 'R33', 'U87', 'L62', 'D20', 'R33', 'U53', 'R51'],
  ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'],
]
console.log(`test (${exInput1}) =>`, calcShortestSteps(exInput1)) // 6
console.log(`test (${exInput2}) =>`, calcShortestSteps(exInput2)) // 159
console.log(`test (${exInput3}) =>`, calcShortestSteps(exInput3)) // 135
console.log('puzzle input =>', calcShortestSteps(input)) // 16368
