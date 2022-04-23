---
title: LifeCycle Methods in React
date: '2022-03-16'
tags: ['react', 'LifeCycle']
draft: false
summary: 'Each component in React has a lifecycle that goes through three main phases Mounting, Updating, and Unmounting.'
---

# Lifecycle Methods

The `componentDidMount()` method runs after the component output has been rendered to the DOM.

`componentDidUpdate()` is invoked immediately after updating occurs. This method is not called for the initial render.

`componentWillUnmount()` will be used if we need to 'cleanup' our page after something occurs.

# Why we use lifecycle methods

**render()**

- we are ONLY going to return some JSX.
- will not be..
  - making a network request
  - making API request

**componentDidMount()**

- good for initial data loading
- getting something ONE TIME
- only gets invoked one time.
- is very similar to the constructor, however the docs do not support this. It is possible, but not recommended to do this in the constructor.
  - any initial loading should be done in the **ComponentDidMount()**.

**componentDidUpdate()**

- called when any changes occur
  - state changes
- good for **multiple data request**

**componentWillUnmount()**

- used anytime we are about to remove a component after no longer need it on a screen.
