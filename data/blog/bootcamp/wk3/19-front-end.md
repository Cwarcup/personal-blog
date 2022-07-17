---
title: Front-End Development
date: '2022-07-16'
tags: ['front-end', 'html', 'css', 'iquery']
images: ['/static/images/postImages/jackson-sophat-_t-l5FFH8VA-unsplash.jpg']
draft: false
summary: Learn about trees and how they can be used to store data.
---

What is a stack?

A stack is a collection of technologies that are used in a given system. For example:

- Web server: **Node.js**
- Middleware: **Express**
- Template Engine: **Ejs**
- Database: **MongoDB**
- Hosting: **Heroku**

Any of the components of the stack can be swapped out for an alternative.

A common stack these days is the [MERN](https://www.mongodb.com/mern-stack) stack: **MongoDB**, **Express**, **React**, **Node**.

or the [MEAN stack](<https://en.wikipedia.org/wiki/MEAN_(solution_stack)>): **MongoDB**, **Express**, **Angular**, **Node**.

## HTML Basics

- `<html>` - represents the **root** of an HTML document
- `<head>` - provides general information (**metadata**) about the document
  - `<title>` - defines the title of the document, shown in a browser's title bar
  - `<link>` - specifies relationships between the current document and an external resource
- `<body>` - represents the content of an HTML document
- `<h1>,` `<h2>`, ... Heading elements implement six levels of document headings
- `<p>` - represents a paragraph of text
- `<div>` - Division Element, generic container for flow content
- `<ol>`, `<ul>` list of items with, or without numerical ordering
  - `<li>` - represents an item in a list
- `<a>` - anchor element; defines a hyperlink to a location or page on the Web
- `<table>` - display a data table. Note: not to be used for layout
  - `<tr>` - a table row
  - `<td>` - a cell in a table row

> References to HTML elements [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

## Styling with CSS

There are three ways to add CSS rules to a page:

1. Linking - add a `<link>` element to the `<head>` element. This is the **recommended** way to add CSS.

```html
<link rel="stylesheet" href="style.css" />
```

2. Inline - add CSS rules to the HTML directly in the HTML code using the `style` attribute.

```html
<style>
  p {
    color: red;
  }
</style>
```

3. Directly to an element

```html
<p style="color: red;">This is red</p>
```
