---
title: Using Unpkg for Dynamic Dependencies
date: '2022-04-22'
tags: ['Unpkg', 'plugin',]
draft: false
summary: Using `esbuild-wasm` NPM module to compile code within a browser. 
---
# Generating Unpkg URLs

So far we have a plugin that is hard coded to take in URLs from 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js'. We need to make sure if we import a path other than 'index.js' that we can generate the correct URL from unkg.com.

```js
import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // onResolve is called whenever ESBuild is trying to figure out a path to a particular module.
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        } else if (args.path === 'tiny-test-pkg') {
          return {
            path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
            namespace: 'a',
          };
        }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('tiny-test-pkg');
              console.log(message);
            `,
          };
        }

        const { data } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
        };
      });
    },
  };
};
```

Replace the `else if` statement in the onResolve callback with the following:

```js
return {
  namespace: 'a',
  path: `https://unpkg.com/${args.path}@latest`,
};
```

However, if we try to load a package that contains a `require` statement, we will get an error.

```js
const toUpperCase = require('./utils');
```

This is because the `onResolve` callback attempts to load the module from "https://unpkg.com/./utils@latest". The './utils' here is causing the error. This error will occur on any module that has a `require` statement.

We want to create a path like so: 'https://unpkg.com/medium-test-pkg@1.0.0/utils.js'.

