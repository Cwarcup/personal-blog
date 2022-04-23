---
title: Design Patterns in TypeScript
date: '2022-03-01'
tags: ['typescript', 'design patterns', 'parcel', 'faker']
draft: false
summary: Here I create a small typescript application using Faker.js. Covers generating a TS project for the web.
---

Install typescript
`$ npm install typescript -g `

Go to project's root folder
`$ cd project_root`

Create tsconfig.json in project's root folder
`$ tsc --init`

- Will be creating our first TS project
  - Will randomly generate...
    - a user (name, last name, etc,)
    - a company (name, location)
  - then use the company location to be displayed on a map

## Create new TS file for Web

- Install [Parcel](https://www.npmjs.com/package/parcel)
  `npm install --save-dev parcel`
- Create a new `index.html`.
  - create basic html doc with a script.
  - add `type="module"` to the script tag.

```html
<html>
  <body>
    <script type="module" src="./src/index.ts"></script>
  </body>
</html>
```

- create folder called "src" and inside of this folder, "index.ts"
- inside your project folder, run `npx parcel index.html`
  - this will run a server at 'http://localhost:1234'

---

In the 'src' folder...

- will create classes `Map.ts`, `User.ts` and `Company.ts`.
  - by convention, any **class** we are going to export will be **capitalized**
- then get all these classes to communicate with our `index.ts` file by importing them.
  - not capitalized because we are not exporting any classes.

---

# Faker Installation

In the upcoming lecture, we will be installing the Faker library. You may notice that the Github repository for Faker is empty or is displaying some confusing messaging. The library currently no longer exists and is not being maintained. However, as of today, it [still exists in the NPM registry](https://www.npmjs.com/package/faker/v/5.5.3) and we are able to install and use it in our projects by specifying the last known good version.

[Faker-js](https://github.com/faker-js/faker)

If you wish to use this library instead, you can install it by running:

`npm install @faker-js/faker --save-dev`

You'll then need to update your imports: Place at the top of your TS project file.

`import faker from '@faker-js/faker';`

As of their v6 release, TS support is now native and **does not require installing the @types declarations**.

[Faker-js API](https://github.com/faker-js/faker#api)

**A community fork of Faker was made to save the project and they are actively working on some fixes and a fresh v6 release:**

`npm install faker@5.5.3`

`npm install @types/faker@5.5.9`

#### Type Definition Files

- may get a warning "could not find a declaration file for module "\_\_\_"."
- act as an adapter between JS libraries and TypeScript code.
- some JS libraries includes a type definition file for us.
  - if it is not included for us, we must manually add it.

[Type Search](https://www.typescriptlang.org/dt/search?search=)

## Using Type Definitions

You can hover over the package you included in your TS project, and while holding **command** and click on the package name, you still be able to view the type definitions file.
`import faker from '@faker-js/faker';`

> hover and command-click "faker".

## Export Statements

- In order to make a class available in another file (such as index.ts) you must **export it** by adding the `export` keyword in front of the class.

```typescript
export class User {
  name: string
  location: {
    lat: number
    lng: number
  }

  constructor() {
    this.name = faker.name.firstName()
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    }
  }
}
```

- must also **import** this class into the desired document.
  - in `{}` add the class name.
  - add the file path to this class.
- We do this so we can safely export multiple classes from the file.
- Can import multiple classes from the same file by adding the name in `{}`.

```typescript
import { User, red } from './User'
```

> can choose to also use the **default** keyword. But these default statements are not used often.
> No `{}` needed.

```typescript
// srv file
export default 'red'

//index.ts file
import red from './User'
```

## Add Google Maps API Support

1. Go to [Google Dev Console](https://console.developers.google.com/)
2. Create a new project and Enable Google Maps support inside the project
   1. Select Maps JavaScript API.
3. Generate API key by going to "API & Services" > "Credentials".
4. Add Google Maps script tag to the HTML file
   1. `<script
      type="module"
      src="https://maps.googleapis.com/maps/api/js?key= <API_KEY> "
      > </script>`

## Google Integration

Required Update for New @types Library:
The @types/googlemaps library that is installed in the next video has been deprecated. Instead, we need to install a different library:

`npm i -D @types/google.maps`

Also, you will still see a TS error in your code editor:

`Cannot find name 'google'.ts(2304)`

As the very first line in the index.ts file, you will need to add a triple slash directive:

`/// <reference types="@types/google.maps" />`

You can read about this in the official docs [here](https://developers.google.com/maps/documentation/javascript/using-typescript#Module_Import).

---

#### Make CustomMap function Reusable

- make a new TS file named 'CustomMap.ts'
- add the following code:

```typescript
export class CustomMap {
  private googleMap: google.maps.Map

  constructor() {
    this.googleMap = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    })
  }
}
```

> Can make this more reusable by having the CustomMap() constructor take in an argument.

```typescript
export class CustomMap {
  private googleMap: google.maps.Map

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    })
  }
}
```

## Adding Markers

See steps on Google [Docs](https://developers.google.com/maps/documentation/javascript/markers), however, course does not follow this.

> Here is a bad way of implementing markers. We have two different methods with a **ton of application between them**.

```typescript
// in CustomMap.ts
import { User } from './User'
import { Company } from './Company'

export class CustomMap {
  //mark as private so nobody else can use the instance of googleMap
  private googleMap: google.maps.Map

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 1,
    })
  }

  //adding a marker
  // generally BAD CODE. Only keep as an example.
  addUserMarker(user: User): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: user.location.lat,
        lng: user.location.lng,
      },
    })
  }
  addCompanyMarker(company: Company): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: company.location.lat,
        lng: company.location.lng,
      },
    })
  }
}
// In index.ts
/// <reference types="@types/google.maps" />
import { User } from './User'
import { Company } from './Company'
import { CustomMap } from './CustomMap'

const user = new User()
const company = new Company()

const customMap = new CustomMap('map')

customMap.addUserMarker(user)
customMap.addCompanyMarker(company)
```

> here is a **good** way of implementing markers using an interface.

```typescript
import { User } from './User'
import { Company } from './Company'

// Instructions to every other class on how they can be an argument to 'addMarker'
interface Mappable {
  location: {
    lat: number
    lng: number
  }
}
export class CustomMap {
  //mark as private so nobody else can use the instance of googleMap
  private googleMap: google.maps.Map

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 1,
    })
  }
  //adding a marker
  addMarker(mappable: Mappable): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    })
  }
}

// index.ts can now simply use 'addMarker()'
/// <reference types="@types/google.maps" />
import { User } from './User'
import { Company } from './Company'
import { CustomMap } from './CustomMap'

const user = new User()
const company = new Company()

const customMap = new CustomMap('map')

customMap.addMarker(user)
customMap.addMarker(company)
```

## Showing Popup Windows

- [Info Windows docs](https://developers.google.com/maps/documentation/javascript/infowindows)

Add a new function to the interface:

```typescript
interface Mappable {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
}
```

> Now anything we want to pass as 'Mappable' must contain the properties `markerContent`. Therefore, we must change our 'User.ts' and 'Company.ts'.

```typescript
//company.ts
import faker from '@faker-js/faker'

export class Company {
  companyName: string
  catchPhrase: string
  location: {
    lat: number
    lng: number
  }

  constructor() {
    this.companyName = faker.company.companyName()
    this.catchPhrase = faker.company.catchPhrase()
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    }
  }

  markerContent(): string {
    return `
      <div>
        <h1>Company Name: ${this.companyName}</h1>
        <h3>Catchphrase: ${this.catchPhrase}</h3>
      </div>
    `
  }
}

//user.ts
import faker from '@faker-js/faker'

export class User {
  name: string
  location: {
    lat: number
    lng: number
  }

  constructor() {
    this.name = faker.name.firstName()
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    }
  }

  markerContent(): string {
    return `User Name: ${this.name}`
  }
}
```

We can add an event listener to listen for a click event and set the contents to whatever is returned from `markerContent()`.

```typescript
// in CustomMap.ts
// Instructions to every other class on how they can be an argument to 'addMarker'
interface Mappable {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
}
export class CustomMap {
  //mark as private so nobody else can use the instance of googleMap
  private googleMap: google.maps.Map

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement, {
      center: { lat: 0, lng: 0 },
      zoom: 1,
    })
  }
  //adding a marker
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    })

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      })

      infoWindow.open(this.googleMap, marker)
    })
  }
}
```

## Optional Implements Clauses

Add in an `export` into the interface we created in CustomMap.ts. Now we can import this into other files.

```typescript
export interface Mappable {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
}
```

Then we go to our `Users.ts` file and import `Mappable`, as well as set `User` to **implement** `Mappable`

```typescript
import { Mappable } from './CustomMap';

export class User implements Mappable {
  ...
}
```

So if we had an error, TS gives us more information:

> Argument of type 'Company' is not assignable to parameter of type 'Mappable'.
> Property 'color' is missing in type 'Company' but required in type 'Mappable'.

## This is not required, but if we fail to implement an interface, TS can tell us where the error is.

You can read about this in the official docs [here](https://developers.google.com/maps/documentation/javascript/using-typescript#Module_Import).

## Summary

1. Wanted to restrict the amount of API function. Only allow specific things we allowed in our application.
   1. someone else can ONLY create a company and reference the company name and location.
   2. wanted to restrict access to `googleMap` by adding on the **private modifier**, meaning we can only access it inside the `customMap`.
2. Interface in `customMap`
   1. initial approad was to allow `addmarker` to accept different types (User.ts, Company.ts..)
      1. bad thing was this set up a dependancie between `CustomMap` and all the classes.
   2. Better approach was to define an **interface**
      1. `CustomMap` will ONLY accept classes that have a location, markerContent() method, and a color.
      2. then added **implements** to each class.
      3. wanted `CustomMap` to tell our classes what we want.

### Typical Typescript File:

We're going to have a number of **interface definitions**. And those **definitions** are going to describe what you have to do to work with the **class**. So our **class definition** will have a couple of methods, and if a given method has to receive some other object to work correctly, rather than specifying that other object type, we're going to instead **specify an interface**. So other objects inside of application can choose to implement that interface so they can work with this class definition.
