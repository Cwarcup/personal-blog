---
title: Where Can I Park?
date: '2022-05-20'
tags: ['Kata']
draft: true
summary: Write a function that returns the coordinates of an available parking spot for the vehicle, or returns false if there is no available spot.
---

We need to write a function called whereCanIPark() that returns the coordinates of an available parking spot for the vehicle, or returns false if there is no available spot. Our function receives an array of arrays representing parking spots, and a string with type of the vehicle that is looking for a parking spot.

There are three kinds of possible vehicles: **regular** cars, **small** cars, and **motorcycles**.
Regular cars can only park in **R** spots.
Small cars can park in **R** or **S** spots.
Motorcycles can park in **R**, **S**, or **M** spots.

In the array of parking spots, spots are written in both lower-case and upper-case. An upper-case letter means that the particular spot is **AVAILABLE**, while lower-case letters mean that the spot is **UNAVAILABLE**.

Our function must return an array with the coordinates of the spot as an `[X, Y]` pair. See the example input and output below for an illustration.

```js
const whereCanIPark = function (spots, vehicle) {
  const avail = vehicleSpots(vehicle)

  for (let row = 0; row < spots.length; row++) {
    for (let col = 0; col < spots.length; col++) {
      let char = spots[row][col]
      if (avail.indexOf(char) > -1) {
        return new Array(col, row)
      }
    }
  }
  return false
}

function vehicleSpots(vehicle) {
  let avail

  if (vehicle === 'regular') {
    return (avail = 'R')
  } else if (vehicle === 'small') {
    return (avail = 'RS')
  } else if (vehicle === 'motorcycle') {
    return (avail = 'RSM')
  } else {
    return 'Need to add type of vehicle'
  }
}

console.log(vehicleSpots('regular'))
console.log(vehicleSpots('small'))
console.log(vehicleSpots('motorcycle'))

console.log(
  whereCanIPark(
    // [3, 1]
    [
      ['s', 's', 's', 's', 's', 's'],
      ['s', 'm', 's', 'S', 'r', 's'],
      ['s', 'm', 's', 'S', 'r', 's'],
      ['S', 'r', 's', 'm', 'r', 's'],
      ['S', 'r', 's', 'm', 'R', 's'],
      ['S', 'r', 'S', 'M', 'm', 'S'],
    ],
    'motorcycle'
  )
)
console.log(
  whereCanIPark(
    // [4, 0]
    [
      // COLUMNS ARE X
      // 0    1    2    3    4    5
      ['s', 's', 's', 'S', 'R', 'M'], // 0 ROWS ARE Y
      ['s', 'M', 's', 'S', 'r', 'M'], // 1
      ['s', 'M', 's', 'S', 'r', 'm'], // 2
      ['S', 'r', 's', 'm', 'r', 'M'], // 3
      ['S', 'r', 's', 'm', 'r', 'M'], // 4
      ['S', 'r', 'S', 'M', 'M', 'S'], // 5
    ],
    'regular'
  )
)

console.log(
  whereCanIPark(
    // false
    [
      ['M', 'M', 'M', 'M'],
      ['M', 's', 'M', 'M'],
      ['M', 'M', 'M', 'M'],
      ['M', 'M', 'r', 'M'],
    ],
    'small'
  )
)
```
