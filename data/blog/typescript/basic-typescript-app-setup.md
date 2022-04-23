---
title: Basic Template for TypeScript App
date: '2022-03-03'
tags: ['typescript', 'template', 'starter']
draft: false
summary: Outlines the commands and steps to get a basic TypeScript app up and running.
---

Get starting files [here:](https://github.com/Cwarcup/notes/blob/fd14a4f548214aefcc5525b32b3e08f8f27ba204/root/typescript/Reusable-TS-Snippets/new-TS-project-template)

```
mkdir <appName>

cd <appName>
```
Generate `package.json`
```
npm init -y
```
Generate `tsconfig.json`
```
tsc --init
```

Install [Nodemon](https://nodemon.io/)
```
npm install -g nodemon
```
Install [Concurrently](https://www.npmjs.com/package/concurrently)
```
npm install -g concurrently
```
Add src and build folders
```
mkdir src build
```

Launch app in vscode
```
code .
```

Configure `tsconfig.json`
```json
"compilerOptions": {
  // ...
  "rootDir": "./src", 
  "outDir": "./build", 
  // ...
}
```

Setup scripts in `package.json` to build, run and run commands concurrently.

```json
  // ...
  "scripts": {
    "start:build": "tsc -w",
    "start:run": "nodemon build/index.js",
    "start": "concurrently npm:start:*"
    // ...
  },
```

Test and run in Terminal
```
npm start
```
> May get an error on the first run. This is because the TypeScript Compiler has not yet generated the index.js file. If this occurs, stop nodemon (control + C) and run app again (`npm start`).

## Node JS
- Will need to add type definition files
```
npm install @types/node
```