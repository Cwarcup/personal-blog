---
title: Cross-site Scripting
date: '2022-07-19'
tags: ['CSS']
images: ['/static/images/postImages/hackerman.jpg']
draft: false
summary: How to prevent XSS attacks
---

We have to be careful when we use HTML in our code, especially when we are dealing with user input.

A user could send malicious code to our server, and we need to prevent this.

What would happen if a user send the code below to our server?

```
<script>
  $("body").empty();
</script>
```

This would remove all the content from the body of the page! NOT GOOD!

The reason for this issue stems from two possible sources:

1. We are including text through the `$()` function.

```js
$(`<div>${textFromUser}</div>`)
```

2. or we are including it through `.html()`

```js
$('<div>').html(textFromUser)
```

## How to prevent XSS attacks

### Use .`text()`

jQuery's .text() method uses the .createTextNode() DOM method, which escapes unsafe characters, so it is safe to use with untrusted text.

Use this method if you are creating the HTML with a jQuery object.

For example:

```js
$('<div>').text(textFromUser)
```

### Use an escape function

Alternatively, you could use a function to escape some text, and then use it inside `.html()` or `$()`.

use this if you have created an element using a string literal.

Here is such a function (it also makes use of `.createTextNode()`):

```js
const escape = function (str) {
  let div = document.createElement('div')
  div.appendChild(document.createTextNode(str))
  return div.innerHTML
}
```

Then you can use it like this:

```js
const safeHTML = `<p>${escape(textFromUser)}</p>`
```
