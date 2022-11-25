---
title: 'All the ways to center things in CSS'
date: '2022-11-25'
tags: ['CSS', 'HTML']
images: '/static/images/individualBlogPostImages/graphql-basics.jpg'
draft: true
summary: 'A summary of all the ways to center a div'
---

Sometimes you just want to center a div. It's a simple task, but there are a lot of ways to do it. Here are all the ways I've found to center a div.

## Centering Text

### Centering Horizontally

We will use this simple HTML to demonstrate the different ways to center text.

```html
<div class="red parent">
  <div class="blue child">Some text</div>
</div>
```

#### Text-align

The most common way to center text is to use the text-align property. This property can be set to center, left, right, or justify. The default value is left.

```css
div {
  text-align: center;
}
```

#### Justify-content: center

- `display: flex` is required to set your div to a flex container.

```css
.parent {
  display: flex;
}

.child {
  text-align: center;
}
```

### Centering Vertically

#### Align-items: center

- `display: flex` is required to set your div to a flex container.

```css
.parent {
  display: flex;
  align-items: center;
}
```

#### Position: absolute

```html
<div class="center">
  <p>Some text</p>
</div>
```

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Centering Horizontally and Vertically

#### Position: absolute

```html
<div class="parent">
  <p class="child">Some text</p>
</div>
```

```css
.parent {
  position: relative;
  background: blue;
  height: 300px;
  width: 300px;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## Centering Divs

### Using Position, Top, Left and Margin

```html
<div class="parent">
  <div class="child">This div is centered vertically and horizontally.</div>
</div>
```

```css
.parent {
  position: relative;
  background: blue;
  height: 300px;
  width: 300px;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: red;
}
```

### Using Position, Top, Left and Transform

```html
<div class="parent">
  <div class="child">This div is centered vertically and horizontally.</div>
</div>
```

```css
.parent {
  position: relative;
  background: blue;
  height: 300px;
  width: 300px;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: red;
}
```

### Using Flexbox

```html
<div class="parent">
  <div class="child">This div is centered vertically and horizontally.</div>
</div>
```

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  background: blue;
  height: 300px;
  width: 300px;
}

.child {
  background: red;
}
```
