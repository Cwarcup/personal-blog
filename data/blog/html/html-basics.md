---
title: Intro to HTML
date: '2022-05-18'
tags: ['HTML']
draft: false
summary: Introduction to the basics of HTML, specifically why it exists and what it does. Will cover common HTML tags and attributes.
---

The browser's first job after downloading a web page is to examine the HTML page and decide how to display it. HTML stands for Hyper Text Markup Language, which is a long way of expressing that plain text may be "marked up" to give it context and structure.

# Tags and Attributes

A tag is a letter or word enclosed by angle brackets (`<` and `>`) at its most basic level. There are several tags that the browser recognises. Each has a pre-defined behaviour that the browser will apply to the content. The tag specifies how the browser will handle the content it contains. The majority of tags encircle the text.

Sometimes, you can have tags inside of other tags. Let's say that you have a paragraph like the one above. But, this time, we want to emphasize the words 'single paragraph' just before the end. HTML gives us the ability to do that, using the `<em> `tag.

```html
<p>
  This is a paragraph element. All of the content from the opening tag at the beginning of the line
  until the closing paragraph tag (the one with the / inside of it) will be treated as a
  <em>single paragraph</em> by the browser.
</p>
```

This paragraph would now appear like this:

This is a paragraph element. All of the content from the opening tag at the beginning of the line until the closing paragraph tag (the one with the / inside of it) will be treated as a single paragraph by the browser.

The `<em>` element is considered nested within the `<p>` element, as it is one element inside of another. HTML pages are built by nesting tags and content inside of each other. The browser is then smart enough to look all the way down to the innermost tags and decide how everything should be displayed.

# Page Structure

The two most important tags in HTML are `<head>` and `<body>`. The `<head>` tag is where you put all the meta tags, links, scripts, etc. The `<body>` tag is where you put all the content.

Here is a standard HTML page layout:

```html
<!DOCTYPE html>
<html lang="...">
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

The `<!DOCTYPE>` tag is a declaration that tells the browser what version of HTML we are using.

The `<html>` tag is the root tag. It is the first tag in the page.

The `<head>` tag is where you put all the meta tags, links, scripts, etc.

The `<body>` tag is where you put all the content.

# Common Meta Tags

`<tittle>` is a meta tag that tells the browser what the title of the page is.

`<link>` is a meta tag that tells the browser where to find a file.

`<script>` is a meta tag that tells the browser how to run a script.

`<style>` is a meta tag that tells the browser how to display the page.Applies CSS to the page. Can use a `link` tag to link to a CSS file.

`<meta>` will contain other configuration options for the page itself, including language, keywords, and other settings that browsers and search engines can use to better represent your page.

# Self-Closing Tags

Not all elements consist of opening and closing tags. Some elements simply receive their content or behavior from attributes within a single tag.

This includes the following:

- `<img>`
- `<input>`
- `<br>`
- `<hr>`
- `<link>`
- `<meta>`
- `<embed>`
- `<param>`
- `<source>`
