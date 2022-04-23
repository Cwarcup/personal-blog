---
title: Interfaces in TypeScript
date: '2022-02-28'
tags: ['typescript', 'Interfaces']
draft: false
summary: How to create code reuse in TypeScript by using interfaces and classes.
---

# Interfaces

We get very strong code reuse in TS when we use **interfaces and classes** together.

**Definition**: Creates a new **type**, describing the **property** **names** and **values** **type** of an object. Remember, an interface forces your class to have the same properties as the interface.

## Long Type Interfaces

```typescript
// create an object
const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
}

//create function to take in this object and print out some properties of it.

const printVehicle = (vehicle: { name: string; year: number; broken: boolean }): void => {
  console.log(`Name: ${vehicle.name}`)
  console.log(`Year: ${vehicle.year}`)
  console.log(`Broken? ${vehicle.broken}`)
}

printVehicle(oldCivic)
// Name: civic
// Year: 2000
// Broken? true
```

The _problem_ is `{ name: string, year: number, broken: boolean }` is very long...which is not the best.

We can improve this file by using an **interface**.

## Fixing long type annotations with Interfaces

### creating an interface

- at the top of the page, create an interface.
- use keyword `interface`
- capitalize the name of the interface (`Vehicle`)
- use a **generic name**.
  - then list out the properties below.

```typescript
interface Vehicle {
  name: string
  year: number
  broken: boolean
}
```

> in order to be a Vehicle, you must have a name which is a string, year which is a number, and broken status that is a boolean.

Now you can delete the LONG annotation `{ name: string, year: number, broken: boolean }` and replace it with the interface `Vehicle`.

```typescript
interface Vehicle {
  name: string
  year: number
  broken: boolean
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
}

const printVehicle = (vehicle: Vehicle): void => {
  console.log(`Name: ${vehicle.name}`)
  console.log(`Year: ${vehicle.year}`)
  console.log(`Broken? ${vehicle.broken}`)
}

printVehicle(oldCivic)
```

Typescript took a look at the arg `oldCivic` and confirms it contains all the appropriate names and values for each.

If you changed the value for broken, you would get an error. See example below:

```typescript
const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: 1,
}
```

We get an error:

```
const oldCivic: {
    name: string;
    year: number;
    broken: number;
}
Argument of type '{ name: string; year: number; broken: number; }' is not assignable to parameter of type 'Vehicle'.
  Types of property 'broken' are incompatible.
    Type 'number' is not assignable to type 'boolean'.
```

## Interface Syntax

When we create an interface, must include the properties (`name`) and their expected values (`string`). But we are not limited to primitive values.

We can express any type we want to.

For example, what if we want to use an instance of a date?

```typescript
interface Vehicle {
  name: string
  year: Date // chance the value here
  broken: boolean
}

const oldCivic = {
  name: 'civic',
  year: new Date(), // update the value here
  broken: true,
}
```

Can also use functions:

```typescript
interface Vehicle {
  name: string
  year: Date
  broken: boolean
  summary(): string // add () and what you expect the function to return
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name is ${this.name}`
  },
}

const printVehicle = (vehicle: Vehicle): void => {
  console.log(vehicle.summary())
}

printVehicle(oldCivic) // Name is civic
```

---

Now, our function is only accessing one property of the vehicle. We are not accessing the properties such as year, broken. Only the `summary()` function.
So do we need to include them in the `Vehicle` interface?

```typescript
interface Vehicle {
  name: string
  year: Date
  broken: boolean
  summary(): string
}
```

> NO. We can delete them.

```typescript
interface Vehicle {
  // this will still work
  summary(): string
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name is ${this.name}`
  },
}

const printVehicle = (vehicle: Vehicle): void => {
  console.log(vehicle.summary())
}

printVehicle(oldCivic)
```

---

Now that our interface only has **one** property, does this name make sense? No. It should be more broad.

```typescript
interface Reportable {
  summary(): string
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name is ${this.name}`
  },
}

const printVehicle = (vehicle: Reportable): void => {
  console.log(vehicle.summary())
}

printVehicle(oldCivic)
```

> we are saying that anything considered `Portable` can return a string with a `summary()`. This is much more **broad** and **reuseable**.

Now the only thing that the function `printVehicle` is doing is providing the name of the vehicle. Maybe we can make this more **generic**.

```typescript
const printSummary = (item: Reportable): void => {
  console.log(item.summary())
}

printSummary(oldCivic)
```

## Code Reuse with Interfaces

By making the interface more generic, we can use this interface with a completely different object.

```typescript
interface Reportable {
  summary(): string
}
//new object
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`
  },
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name is ${this.name}`
  },
}

const printSummary = (item: Reportable): void => {
  console.log(item.summary())
}

printSummary(oldCivic) // Name is civic
printSummary(drink) // My drink has 40 grams of sugar
```

So both our `oldCivic` and `drink` both have a `summary()` function tied to them. These two object represent VERY different things. However, they both have a property called summary, that return a string, BOTH of them are **type reportable**.

> Because of this, we can call `printSummary()` on both of them and have them return **different things!**.

**We can use a single interface to describe the properties of very different objects.**

> This encourages us to write generic functions.

## Summary

#### General Strategy for Reuseable Code in TS

- create functions that accept arguments that are **types with interfaces**
- **Objects/classes** can decide to 'implement' a given interface to work with a function
