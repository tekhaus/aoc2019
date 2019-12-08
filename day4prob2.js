/*
--- Day 4: Secure Container ---
--- Part Two ---
An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.

Given this additional criterion, but still ignoring the range rule, the following are now true:

112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
How many different passwords within the range given in your puzzle input meet all of the criteria?

Your puzzle input is still 387638-919123.
*/

const findValidPasswords = (start, end) => {
  const validPasswords = []

  const twoConsecutiveMatches = password =>
    password.toString().match(/([0-9])\1/g)

  const threeConsecutiveMatches = password =>
    password.toString().match(/([0-9])\1\1/g)

  const match2AndNot3 = (match2, match3) =>
    match2.filter(match => !match3.includes(`${match}${match.slice(1)}`))

  const hasNoDecrease = password => {
    return (
      password
        .toString()
        .split('')
        .filter((digit, idx, arr) => digit < arr[idx - 1]).length === 0
    )
  }
  // brute force, try all passwords in range
  for (i = start; i <= end; i++) {
    if (hasNoDecrease(i)) {
      const match2 = twoConsecutiveMatches(i)
      if (match2) {
        const match3 = threeConsecutiveMatches(i)
        if (match3) {
          if (!match2AndNot3(match2, match3).length) continue
        }
        validPasswords.push(i)
      }
    }
  }

  return validPasswords.length
}

console.log('puzzle input =>', findValidPasswords(387638, 919123)) // 292
