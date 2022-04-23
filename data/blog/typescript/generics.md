---
title: Generics In TypeScript
date: '2022-03-01'
tags: ['typescript', 'generics']
draft: false
summary: Making code reusable in TypeScript by using generics.
---

```typescript
class ArrayOfNumbers {
  constructor(public collection: number[]) {}

  get(index: number): number {
    return this.collection[index]
  }
}

class ArrayOfStrings {
  constructor(public collection: string[]) {}

  get(index: number): string {
    return this.collection[index]
  }
}
```

Here we have two classes that are almost identical except the **type of collection**.
Ideally we can condense these two classes into one. We can do this with **generics**.

---

```typescript
class ArrayOfAnything<T> {
  constructor(public collection: T[]) {}

  get(index: number): T {
    return this.collection[index]
  }
}
```

> Remember `<T>` can be called anything. By convention we usually refer to it as T.
> Picture `<T> `as an argument. Anytime we reference this class, replace T with the type.

If we wanted an array of strings...

```typescript
class ArrayOfAnything<T> {
  constructor(public collection: T[]) {}

  get(index: number): T {
    return this.collection[index]
  }
}

new ArrayOfAnything<string>(['a', 'b', 'c', 'd'])
new ArrayOfAnything<number>([1, 2, 3, 4, 5])
```

Now if you deleted `string` from `new ArrayOfAnything<string>(['a', 'b', 'c', 'd'])`, it appears things are fine.

```typescript
const arr = new ArrayOfAnything(['a', 'b', 'c', 'd'])
```

> Hovering over `arr` shows `"const arr: ArrayOfAnything<string>"`.

How does Typescript know that `arr` is type string? Because of **type inference.** Because we took in a string, TS is smart and thinks the type should be string, even though we didn't explicitly define it.

# Example of Generics with Functions

Again we have a lot of code duplication.

```typescript
function printStrings(arr: string[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

function printNumbers(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}
```

Lets make this function generic.

```typescript
function printAnything<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

printAnything<string>(['a', 'b', 'c'])
printAnything(['a', 'b', 'c'])
printAnything<number>([1, 2, 3, 4])
```

> Again, T is not some special identifier.

Sometimes it's good to add in the expected type. Prevents mistakes from occurring.

```typescript
printAnything<number>(['a', 'b', 'c'])

// error: Type 'string' is not assignable to type 'number'.
```

## Generics Constraint

```typescript
class Car {
  print() {
    console.log('I am a car')
  }
}

class House {
  print() {
    console.log('I am a house')
  }
}

function printHousesOrCars<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print()
  }
}
```

Get an error on `print()` within `arr[i].print();` "Property 'print' does not exist on type 'T'.". This is because TS does not know if `T` will have the `print()` method available.

To get around this, we can define an **interface**. Then **extend** this interface to `T`.

```typescript
interface Printable {
  print(): void
}

function printHousesOrCars<T extends Printable>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print()
  }
}

printHousesOrCars([1, 2, 3, 4]) // ERROR: arr[i].print is not a function. Does not have print() method on a number.
printHousesOrCars([new House(), new House()])
printHousesOrCars([new Car(), new Car()])
```
