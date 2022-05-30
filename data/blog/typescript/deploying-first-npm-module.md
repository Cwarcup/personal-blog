---
title: How to deploy a TypeScript NPM Module
date: '2022-05-30'
tags: ['typescript', 'NPM', 'deployment']
draft: false
summary: Outlines the steps to deploy a module written in TypeScript to the NPM registry.
---

We are going to create a small NPM module that will be deployed to the NPM registry.

Start off by creating a new project folder.

```
mkdir example-npm-module

cd example-npm-deploy

npm init -y

// add typescript and express support
npm install typescript express

// install their type definitions
npm install @types/express

// initialize a tsconfig.json file
npx tsc --init
```

# Project Setup

## Configuring the tsconfig.json file

```json
"compilerOptions": {
  // ...
  "rootDir": "./dist", // set the root directory for the project. This is where the TSC compiler will generate the javascript files.
  "declaration": true, // generate a declaration file for the project. This is used for type checking.
  // ...
}
```

## Configuring the package.json file

```json
"scripts": {
  "build": "tsc", // compile the typescript files into javascript files.
}
```

Now if you run `npm run build` you will see a new folder called `dist` created, and a new `index.js` file created inside of it.

## Prepping for NPM deployment Checklist

- [ ] Make sure package name is unique. Go to [NPM](https://www.npmjs.com/) and search for the package name. If the name is already taken, you must **change the name of your project in the `package.json` file.**
- [ ] Specify which files you want top publish to NPM. Inside of the `package.json` file, add the following to ensure that only the `dist` folder is published to NPM.

```json
 "files": [
    "dist"
  ],
```

- [ ] Split your dependencies and devDependencies into two different files. Whenever you publish a package, you should only publish the dependencies. It will **not** install the devDependencies.

```json
"dependencies": {
    "express": "^4.18.1"
  },
"devDependencies": {
  "typescript": "^4.7.2",
  "@types/express": "^4.17.13"
}
```

- [ ] Set package to be publicly accessible.

```json
"publicConfig": {
    "access": "public"
  },
```

- [ ] If you are building a CLI, configure the file to run.

```json
"bin": "dist/index.js"
```

Add the following to at the very top your main `index.ts` file in src to allow us to directly execute the file instead of writing out `node dist/index.js`.

```typescript
#!/usr/bin/env node
```

- [ ] Add a `prePublish` script to the `package.json` file.

```json
"scripts": {
  "build": "tsc",
  "prepublishOnly": "npm run build"
},
```

- [ ] Commit to git. Do not need to push to Github or anything like that. Just commit to git. Back in terminal, run `git commit"`. Create a `.gitignore` file and add `dist` and `node_modules` to the list of files to ignore. You can confirm what files you are committing by running `git status`.
  - [ ] `git add .`
  - [ ] `git commit -m "Initial commit"`
- [ ] Login to NPM CLI with `npm login`.
- [ ] Run `npm publish` to publish the package to NPM.
