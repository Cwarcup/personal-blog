---
title: Decorators in TypeScript
date: '2022-03-01'
tags: ['typescript', 'decorators']
draft: false
summary: Learn how to use decorators in TypeScript. What are they? How do they work?
---

TypeScript Docs on [decorators.](https://www.typescriptlang.org/docs/handbook/decorators.html)

import [ts-express-decorator.](https://www.npmjs.com/package/ts-express-decorators)

Decorators are...
- function that can be used to **modify/change properties/methods in the class.**
- not the same as JavaScript decorators.
- used inside/on classes only.
- understanding the order in which decorators are ran.
- experimental and may change over time.

```typescript
class Boat {
    color: string = 'red'

    get formattedColor(): string {
        return `This color of this boat is ${this.color}`
    }

    @testDecorator
    pilot(): void {
        console.log('swish')
    }
}

function testDecorator(target: any, key: string): void {
    console.log('Target:', target)
    console.log('Key:', key )
}
```
If we run this we get:
```
Target: Boat { formattedColor: [Getter], pilot: [Function] }
Key: pilot
```

A decorator gets called with a few arguments:
1. The **prototype** of the object.
   + in our case, we are talking about the prototype of **class** `Boat`.
   - `target: any` is `Boat` and lists out all the different methods in class `Boat`
2. Second argument is the key of the **property/method/accessor** that we applied our decorator to.
   - in our case, the key is `pilot`.
3. the **property descriptor**.

Decorators are applied when the code for this class is ran (**not when an instance is created**). When we define class Boat, decorators get executed. Again, because this note is important, a decorator only gets executed one single time when we define the class.

Under the hood, this is what it looks like in js (stripped to its barebones):
```javascript
var __decorate = function(decorators, target, key, desc) {
    var desc = Object.getOwnPropertyDescriptor(target, key)

    for (var decorator of decorators) {
        decorator(target, key, desc)
    }
}
```

## Property Descriptor
> A property descriptor is essentially an object that is meant to configure a property on another object. Is not TypeScript specific, but ES5. Therefore can be used in Node.js.

| Property Descriptor Methods |
| --------------------------- | ---------------------------------------------------------------------- |
| writable                    | Whether or not this property can be **changed**                        |
| enumerable                  | Whether or not this property can get **looped** over by a 'for..in'    |
| value                       | **current** value                                                      |
| configurable flag           | Property definition can be **changed** and property can be **deleted** |

```
const car = { make: "honda", year: 2022}

Object.getOwnPropertyDescriptor(car, 'make')
    // {value: 'honda', writable: true, enumerable: true, configurable: true}
```
> add the object (car in this case) and the key of the property descriptor we want ('make').

Can modify other properties. For example, let's change the writable property of 'make' to false. Therefore, we can not change the value of the property 'make'.
```
Object.defineProperty(car, 'make', { writable: false } ); 
// >{make: 'honda', year: 2022}

// try to change the value of 'make' on the car object.
car.make = 'chevy'
// >'chevy'

car
// > {make: 'honda', year: 2022}
```
>This whole property descriptor is how we will modify our **descriptors**.

If want to change properties on our prototype we need to go through our `desc`.

```typescript
class Boat {
  color: string = 'red'

  get formattedColor(): string {
      return `This color of this boat is ${this.color}`
  }

  @LogError
  pilot(): void {
    throw new Error();
      console.log('swish')
  }
}

function LogError(target: any, key: string, desc: PropertyDescriptor): void {
  const method = desc.value;

  desc.value = function () {
    try {
      method();
    } catch (err) {
      console.log('oops, boat sank');
    }
  }
}

new Boat().pilot();      // oops, boat sank
```
> Now if anything went wrong within our class Boat, we can just throw on the `LogError` decorator to catch an error.
> This is just one example of how we can get at a function and wrap it with some additional functionality.

## Decorator Factories

How about we **customize the error message** so that this decorator can be used on other classes that aren't Boats. How? Use a **decorator factory**.

> A decorator factory is essentially a decorator that returns a function.

```ts 
class Boat {
  color: string = 'red'

  get formattedColor(): string {
      return `This color of this boat is ${this.color}`
  }

  @LogError("oh no! Boat is going down!")
  pilot(): void {
    throw new Error();
      console.log('swish')
  }
}
function LogError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
  
    desc.value = function () {
      try {
        method();
      } catch (err) {
        console.log(errorMessage);
      }
    }
  }
}

new Boat().pilot()    // oh no! Boat is going down! 
```

## Decorators Around Properties

```ts 
class Boat {
  @testDecorator
  color: string = 'red'

  get formattedColor(): string {
      return `This color of this boat is ${this.color}`
  }

  @LogError("oh no! Boat is going down!")
  pilot(): void {
    throw new Error();
      console.log('swish')
  }
}

// new decorator
function testDecorator(target: any, key: string) {
  console.log(target.color);            // return undefined
}
function LogError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
  
    desc.value = function () {
      try {
        method();
      } catch (err) {
        console.log(errorMessage);
      }
    }
  }
}
```
`testDecorator(target: any, key: string)` returns `undefined` because the **first argument** is always going to be the **prototype** of this **class**. And remember, prototype only stores **method** instances. Therefore, our decorator will never be able to access any **instance properties on an instance.** 

Main takeaway here is that whenever we use a decorator on a property inside of a class, we can't get direct access to that property - the **decorator** is being executed **before** we ever create an **instance**. 

Second thing to note is that the **only argument** that we get to our decorator is the actual **prototype** as opposed to the actual value or anything like that. 

## More on Decorators

Places we can **apply decorators**:
- property inside a class:
- an accessor:
- a method:
> Examples below
```ts 
class Boat {
        // can use decorators on..

        // property inside a class
  @testDecorator
  color: string = 'red'

    // an accessor
  @testDecorator
  get formattedColor(): string {
      return `This color of this boat is ${this.color}`
  }

    // a method
  @LogError("oh no! Boat is going down!")
  pilot(): void {
    throw new Error();
      console.log('swish')
  }
}

    // color
    // formattedColor
```
### Decorator on a Parameter
Can also use decorators on a **[parameter or argument](https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators) to a method**:
```ts 
function parameterDecorator(target: any, key: string, index: number) {
    //...
}
```
>target: the class we are using this on. In our case, it could be Boat.
>key: name of the method. In our case, Pilot()..
> index: is the actual index of the argument we are applying this to.
```ts 
class Boat {
  @testDecorator
  color: string = 'red'

  @testDecorator
  get formattedColor(): string {
      return `This color of this boat is ${this.color}`
  }

  @LogError("oh no! Boat is going down!")
  pilot(@parameterDecorator speed: string, @parameterDecorator generateWake: boolean): void {  // add decorator before the parameter we are targeting.
    if (speed === 'fast') {
      console.log('swish, such speed!');
    } else {
      console.log('nothing');
    }
  }
}

    // create our parameter decorator.
    // so this would log the key and index of the argument(s)
function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

function testDecorator(target: any, key: string) {
  console.log(key)
}

//returns
// color
// formattedColor   
// pilot 1 - this is the second parameterDecorator
// pilot 0 - this is the first parameterDecorator
```

### Decorator on a class definition
Applying a decorator to class Boat.

```ts 
@classDecorator
class Boat {
  @testDecorator
  color: string = 'red'

  @testDecorator
  get formattedColor(): string {
      return `This color of this boat is ${this.color}`
  }

  @LogError("oh no! Boat is going down!")
  pilot(@parameterDecorator speed: string, @parameterDecorator generateWake: boolean): void {  
    if (speed === 'fast') {
      console.log('swish, such speed!');
    } else {
      console.log('nothing');
    }
  }
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor); // [function: Boat]
}

function parameterDecorator(target: any, key: string, index: number): void {
  console.log(key, index); // pilot 1, pilot 0
}

function testDecorator(target: any, key: string) {
  console.log(key) // color, formattedColor
}
```