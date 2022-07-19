---
title: AJAX
date: '2022-07-20'
tags: ['ajax', 'async']
images: ['/static/images/postImages/jquery-illustration.jpg']
draft: true
summary: Asynchronous JavaScript And XML (AJAX) is a technique for making requests to a server. This post does into to the basics of AJAX and making requests to a server using jQuery.
---

- AJAX is implemented using the `XMLHttpRequest` (`XHR`) object
- Modern libraries like **jQuery** and **Axios** make it easy to make AJAX requests by creating wrappers around the `XMLHttpRequest` object

## jQuery AJAX

- jQuery has a [built in method for making AJAX requests](https://api.jquery.com/jQuery.ajax/)

```js
$.ajax({
  url: 'https://jsonplaceholder.typicode.com/posts',
  method: 'GET',
  dataType: 'json',
  success: (data) => {
    console.log("this request succeeded and here's the data", data)
  },
  error: (error) => {
    console.log('this request failed and this was the error', error)
  },
})
```

Another example:

```js
// jquery to listen for new tweet button click
$('#submit-tweet').submit(function (event) {
  event.preventDefault()
  // data from new-tweet form
  const tweetText = $('#submit-tweet').serialize()

  // create ajax POST request to /tweets
  $.ajax({
    url: '/tweets',
    type: 'POST',
    data: tweetText,
    success: function (data) {
      console.log('data was sent to server')
      // clear the form
      $('#tweet-text').val('')
    },
    error: function (error) {
      console.log(error)
    },
  })
})
```

### important things to know about AJAX

- form data is encoded to a **query string format** prior to being submitted to the server (`field1=value1&field2=value2`)
- Ajax support `GET`, `POST`, `PUT`, `DELETE` requests
- can receive any type of text data (`text/plain`, `text/html`, `application/json`, `application/xml`)

## jQuery Shorthand Methods

- jQuery has several shorthand methods so that we don't have to use the full `.ajax()` method every time

```js
// make a get request to the specified endpoint
$.get('https://jsonplaceholder.typicode.com/posts')

// make a get request for JSON data
$.getJSON('https://jsonplaceholder.typicode.com/posts')

// make a post request
$.post('https://jsonplaceholder.typicode.com/posts', {
  /* form data */
})
```
