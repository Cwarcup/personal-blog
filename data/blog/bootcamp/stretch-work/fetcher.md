---
title: Fetcher
date: '2022-07-06'
tags: ['requests']
images: ['/static/images/postImages/andy-powell-GuE_qLQ_Ej8-unsplash.jpg']
draft: false
summary: Fetcher data from a URL and write them to a desired path.
---

`fetcher` downoads the resource at the URL to the local path on your machine. Upon completion, it should print out a message like `Downloaded and saved 1235 bytes to ./index.html`.

```bash
> node fetcher.js http://www.example.edu/ ./index.html
Downloaded and saved 3261 bytes to ./index.html
```

- You need to make an http request and wait for the response.
- After the http request is complete, you need to take the data you receive and write it to a file in your local filesystem.

> Edge Case 1: File Already Exists:
> If the file path already exists, right now your app will overwrite it! If you want to change this, let the user know and prompt them to type in `y` (followed by the `enter` key) to overwrite the file, otherwise skip and exit the app. We suggest using the readline module, which we've previously used.

> Edge Case 2: File Path is Invalid:
> If the file path is invalid, the app should fail and let the user know about this issue.

> Edge Case 3: URL is Invalid
> If the URL is invalid, terminate the app explaining to the user what went wrong, and not write the response body to the file.

## Tools used:

- [request module](https://www.npmjs.com/package/request)
- [fs](https://nodejs.org/api/fs.html)
- [readline](https://nodejs.org/docs/latest-v16.x/api/readline.html)
- [chalk v4.1.2](https://www.npmjs.com/package/chalk)

## Code

```js
const request = require('request')
const fs = require('fs')
const chalk = require('chalk')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const error = chalk.bold.red
const success = chalk.bold.green

const args = process.argv.slice(2)
const url = args[0]
const path = args[1]

const fetcher = (url, path) => {
  request(url, (err, data, body) => {
    if (data.statusCode !== 200) {
      console.log(error(`Oh no!`))
      console.log(
        `Looks like there was an issue with the URL.\nUse the status code to see what went wrong.\nStatus code: ${data.statusCode}`
      )
    }
    if (data.statusCode === 200) {
      fs.writeFile(path, body, { encoding: 'utf-8', flag: 'wx' }, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.log('File not found. Double the path.')
          }
          if (err.code === 'EACCES') {
            console.log('Permission denied. Double the path.')
          }
          if (err.code === 'EEXIST') {
            rl.question(
              'File already exists. Double the path.\nIf you want to overwrite the file, press "y" followed by enter.',
              (answer) => {
                if (answer === 'y') {
                  fs.writeFile(path, body, { encoding: 'utf-8', flag: 'w' }, (err) => {
                    if (err) {
                      console.log(error(`Oh no!`))
                      console.log(
                        `Looks like there was an issue with the URL.\nUse the status code to see what went wrong.\nStatus code: ${data.statusCode}`
                      )
                    }
                    if (!err) {
                      console.log(success(`Success!`))
                      console.log(`The file was saved to ${path}`)
                    }
                  })
                  rl.close()
                } else {
                  rl.close()
                }
              }
            )
          }
        }
        if (!err) {
          console.log(success(`Success!`))
          console.log(`Downloaded and saved ${body.length} bytes to ${path}`)
        }
      })
    }
  })
}

fetcher(url, path)
```
