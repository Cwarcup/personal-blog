---
title: TypeScript Type Annotations and Inferences of Functions and Objects
date: '2022-02-25'
tags: ['typescript', 'type annotations', 'inferences']
draft: false
summary: How does TypeScript infer types? Here we will look at how both annotations and inferences are used in TypeScript. We look at how to apply them to functions and objects. 
---

# Functions - Type Annotations and Inferences
- Annotations: code we tell TS what type of arguments a function will receive and what type of values it will return. 
- Inference: TS tries to figure out what of value a function will return.

```typescript
const add = (a, b) => {
  // if hover over a or b: Parameter 'a' implicitly has an 'any' type, but a better type may be inferred from usage.
}
```
Fix:
```typescript
const add = (a: number, b: number) => {

}
```

Can alo tell TS that we want to **return** a number by adding `: number`
```typescript
const add = (a: number, b: number): number => {
  return a+ b;
}
```

**every time we write a function we need to write our the annotations for the parameters** `(a: number, b: number)`
- we NEVER get type inference for arguments. 

However, type **inference** works on functions, but we will not use it. `: number`. TS knows we will be returning a number, **but we will still be adding it**

If we do not add a return statement, and hover over `subtract` "const subtract: (a: number, b: number) => void". Void means we are not returning anything at all. 
```typescript
const subtract = (a: number, b: number) => {
  a - b;
}
```

## annotations with arrow functions
```typescript
const subtract = (a: number, b: number) => {
  a - b;
}
```

## add annotations with function keyword
```typescript
function divide(a: number, b: number): number {
  return a / b;
}
```

## Annotations for Anonymous Functions
```typescript
const multiply = function(a: number, b: number): number {
  return a * b;
}
```
**Always following this structure**
| param annotation       | return val annotation |
| ---------------------- | --------------------- |
| (a: number, b: number) | : number              |

## Void and Never

```typescript
const logger = (message: string): void => {
  console.log(message);
}
```
- use `void` here to say there will be no return value from this function.

```typescript
const throwError = (message: string): never => {
  throw new Error(message);
}
```
- use `never` to say we are never going to actually reach the end of this function. We will eventually hit the error and exit the function. This is a pretty rare case. 

## Destructuring with Annotations

```typescript
const todaysWeather = {
  date: new Date(),
  weather: 'sunny' 
}

// destructuring with an annotation
const logWeather = ({ date, weather}: { date: Date, weather: string }): void => {
  console.log(date);
  console.log(weather);
};
```

first do the destructuring `{ date, weather}:`, then do the annotations `{ date: Date, weather: string })`


# Annotations around Objects

- have to label the type of every property within our object. 
```typescript
const profile = {
  name: 'Alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number): void { 
    this.age = age;
  }
};

//destructuring setAge
const { age }: {age: number} = profile;

//destructuring lat and lng
const { coords: { lat, lng } }: { coords: { lat: number; lng: number}} = profile;
```
