/*
--- Day 6: Universal Orbit Map ---
--- Part Two ---
Now, you just need to figure out how many orbital transfers you (YOU) need to take to get to Santa (SAN).

You start at the object YOU are orbiting; your destination is the object SAN is orbiting. An orbital transfer lets you move from any object to an object orbiting or orbited by that object.

For example, suppose you have the following map:

COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN
Visually, the above map of orbits looks like this:

                          YOU
                         /
        G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I - SAN
In this example, YOU are in orbit around K, and SAN is in orbit around I. To move from K to I, a minimum of 4 orbital transfers are required:

K to J
J to E
E to D
D to I
Afterward, the map of orbits looks like this:

        G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I - SAN
                 \
                  YOU
What is the minimum number of orbital transfers required to move from the object YOU are orbiting to the object SAN is orbiting? (Between the objects they are orbiting - not between YOU and SAN.)
*/
const fs = require('fs')
const input = fs.readFileSync('day6-input.txt', 'utf8').split('\n')

const transfersNeeded = orbitMap => {
  const orbitsToCOM = sat => {
    let orbits = []
    let obj = sat

    while (obj !== 'COM') {
      const directOrbit = orbitMap.find(orbit => orbit.split(')')[1] === obj)
      obj = directOrbit.split(')')[0]
      orbits.push(obj)
    }

    return orbits
  }

  const you = orbitsToCOM('YOU')
  const san = orbitsToCOM('SAN')

  let commonAncestor = 'COM'
  // can break after first match, since it will be the first common ancestor
  for (let i of you) {
    if (san.includes(i)) {
      console.log(i)
      commonAncestor = i
      break
    }
  }

  return you.indexOf(commonAncestor) + san.indexOf(commonAncestor)
}

console.log('puzzle input =>', transfersNeeded(input)) // 397
