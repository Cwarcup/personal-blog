---
title: Functionality with Classes
date: '2022-02-28'
tags: ['typescript', 'classes']
draft: false
summary: Understanding the class keyword and how it works in TypeScript.
---

# What are classes?

Definition: class is a **blueprint/model** to create an object with some fields (values) and methods (functions) to represent a 'thing'.

- use `class` keyword, then write the name of the class with a capital.
- we are creating a blueprint for what a Vehicle should be. We are not actually calling these methods directly.

```typescript
class Vehicle {
  drive(): void {
    console.log('chugga chugga')
  }
}

const vehicle = new Vehicle()
```

> Now with a new instance of a class, we have access to all the methods in that class.

```typescript
//define a new class

class Vehicle {
  drive(): void {
    console.log('chugga chugga')
  }
  honk(): void {
    console.log('beep beep!')
  }
}

const vehicle = new Vehicle()

vehicle.drive() // chugga chugga
vehicle.honk() // beep beep!
```

## Inheritance

Lets make a new class called "Car". Everything a car can do, a vehicle should be able to do.

- we could either copy all the properties of the 'Vehicle'...
- or we can write **extends** to extend the properties to Car
  - tells TS to copy all the properties from Vehicle into Car

```typescript
class Vehicle {
  drive(): void {
    console.log('chugga chugga')
  }
  honk(): void {
    console.log('beep beep!')
  }
}

class Car extends Vehicle {}

const car = new Car()
car.drive() // chugga chugga
car.honk() // beep beep!
```

> we can also redefine a property to override the parent property.

```typescript
class Vehicle {
  drive(): void {
    console.log('chugga chugga')
  }
  honk(): void {
    console.log('beep beep!')
  }
}

class Car extends Vehicle {
  drive(): void {
    console.log('vroom!')
  }
}

const car = new Car()
car.drive() //vroom!
car.honk() // beep beep!
```

## Instance Method Modifiers

**Modifiers** are a **keyword** we can can place on different methods and properties in a class.

- can be either **public, private or protected**

---

If you do not add any modifier, TS defaults to public.

Examples:

```typescript
class Vehicle {
  public drive(): void {
    console.log('chugga chugga')
  }
  public honk(): void {
    console.log('beep beep!')
  }
}

class Car extends Vehicle {
  public drive(): void {
    console.log('vroom!')
  }
}

const car = new Car()
car.drive()
car.honk()
```

> No change. Will act the exact same as previously.
> **Private Modifier**

```typescript
class Vehicle {
  public drive(): void {
    console.log('chugga chugga')
  }
  public honk(): void {
    console.log('beep beep!')
  }
}

class Car extends Vehicle {
  private drive(): void {
    console.log('vroom!')
  }
}

const car = new Car()
car.drive()
car.honk()
```

> get an error on car.drive()
> "Property 'drive' is private and only accessible within class 'Car'."

Can add a new function called startDrivingProcesses() and call the `drive()` function in it.

```typescript
class Vehicle {
  public drive(): void {
    console.log('chugga chugga')
  }
  public honk(): void {
    console.log('beep beep!')
  }
}

class Car extends Vehicle {
  private drive(): void {
    console.log('vroom!')
  }
  startDrivingProcess(): void {
    this.drive()
  }
}

const car = new Car()
car.startDrivingProcess() // vroom!
car.honk() // beep beep!
```

#### Why do we care?

- we do not mark something as private for security.
- use it to limit developers to prevent them from calling a method.

---

**Protected Modifiers:**

```typescript
class Vehicle {
  protected honk(): void {
    console.log('beep beep!')
  }
}

class Car extends Vehicle {
  drive(): void {
    console.log('vroom!')
  }
  startDrivingProcess(): void {
    this.drive()
    this.honk()
  }
}

const car = new Car()
car.startDrivingProcess() // will work because this.honk() is called inside the class
car.honk() //will NOT work since it is called outside the class
```

## Fields in Classes

```typescript
class Vehicle {
  color: string = 'red' // initialize a variable inside a class

  protected honk(): void {
    console.log('beep beep!')
  }
}

const vehicle = new Vehicle()
console.log(vehicle.color) // red
```

But what is we want to write something like `const vehicle = new Vehicle('orange');` and have that be the color? In this case, we need a **constructor**.

```typescript
class Vehicle {
  color: string = 'red'

  constructor(color: string) {
    this.color = color
  }

  protected honk(): void {
    console.log('beep beep!')
  }
}

const vehicle = new Vehicle('orange')
console.log(vehicle.color) // orange
```

> can either initialize a property using the default value, or use the constructor and add an argument.

Shortcut to automate this:

- delete the implementation inside the constructor, delete the property definition...
- and add `public` to the constructor.

```typescript
class Vehicle {
  constructor(public color: string) {}

  protected honk(): void {
    console.log('beep beep!')
  }
}

const vehicle = new Vehicle('orange')
console.log(vehicle.color)
```

> this code is equivalent to the previous example. This is just shorter.

## Fields with Inheritance

```typescript
class Vehicle {
  constructor(public color: string) {}

  protected honk(): void {
    console.log('beep beep!')
  }
}

const vehicle = new Vehicle('orange')

class Car extends Vehicle {
  drive(): void {
    console.log('vroom!')
  }
  startDrivingProcess(): void {
    this.drive()
    this.honk()
  }
}

const car = new Car() // get an error here
```

> error: constructor Car(color: string): Car.
> Expected 1 arguments, but got 0.

We need to provide an argument: `const car = new Car('red');`

Now whenever we create a new instance of `Car`, because `Car` **extends** from `Vehicle`, `Car` expects an argument for the constructor. This is because `Vehicle` is the **parent**.

Things will be a little different if we define a **constructor function inside `Car` as well**.

```typescript
class Car extends Vehicle {
  constructor(public wheels: number) {
    // get an error here
  }
  drive(): void {
    console.log('vroom!')
  }
  startDrivingProcess(): void {
    this.drive()
    this.honk()
  }
}
```

> Error: constructor Car(wheels: number): Car
> Constructors for derived classes must contain a 'super' call.

What is **super** ?

- is a reference to the 'super' class, or **parent class of car which is `Vehicle`**
  - we must also call the super constructor of the parent as well.

```typescript
class Car extends Vehicle {
  constructor(public wheels: number) {
    super('red')
  }
  drive(): void {
    console.log('vroom!')
  }
  startDrivingProcess(): void {
    this.drive()
    this.honk()
  }
}
```

> but chances are we still want the color to come in as an argument when we create it.
> How do we do this?

```typescript
class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color)
  }
  drive(): void {
    console.log('vroom!')
  }
  startDrivingProcess(): void {
    this.drive()
    this.honk()
  }
}

const car = new Car(4, 'red')
console.log(car) // { color: 'red', wheels: 4 }
```

## Where to Use Classes

- remember interfaces and classes are the primary tools in typescript.
- when we use TS, we have a single file for each class.
  - and use these different classes through the use of interfaces.
