---
title: Tuples
date: '2022-02-27'
tags: ['typescript', 'tuples']
draft: false
summary: Learn what tuples are in TS and how to use them. 
---


# Tuples

- are an **array-like structure** where each element represents some **property of a record**.
  - looks VERY similar to an array.
  - usually contains multiple properties to represent one single thing.
  - will usually contain multiple types.

Example: How do we use an object to present a 'drink'?
```
{
color -> brown
carbonated -> true
sugar -> 40
}
```

Lets take this object and represent it as an array `[]`
` [brown, true, 40]` But we have alost a lot of information about the object. We would need to memorize the order of properties.

**Ordering is critical** - we need to know the order of properties.

```typescript
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
};

type Drink = [string, boolean, number];

const pepsi: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];
```

## Why tuples? 

- will not be used often. 
- may be used with CSV file. 

If we only looked at meaningful data like this, as a tuple...

```typescript
const carSpecs: [number, number] = [400, 3354];
```

The numbers do not provide **any meaning**. Let's write these as an object instead.

```typescript
const carStats = {
  horsepower: 400,
  weight: 3354
};
```

Since we have **keys and values**, it is clear what we are working with. 