---
title: Group Projects
date: '2022-07-29'
tags: ['Projects']
images: ['/static/images/postImages/geran-de-klerk-f0oe9P9Yixs-unsplash.jpg']
draft: true
summary: How to start a group project.
---

## User Stories

- As a user ... Role
  - As a user... I want to be able to...
  - As an administer...I want to be able to...
- I want to... Goal
- Because... Benefit

As an adminstrater of this website I wantr to be able to block a user from the site because they have broken the terms of use.

- Describes **WHO** is **ABLE to do what** and **WHY** the user should be able to do this.

You can use this set opf userstproes to build your ERD, or make a REST API.

### Making Better User Stories

Bad example: "Users should see a lit of available maps"

Good Example: "As a user I want to see all the available maps because I want to quickly select a map that matches my interest."

After making user stories...

## Making a list of features

- user authentication
- real time updates - web sockets?
- colors used - frontend
- Mobile friendly? Sass, relative units

Need to be able to prioritize the features.

## MVP

Minimal viable product (MVP) is a product that is a good starting point for a project. It is a product that is easy to use and easy to understand.

You do the bare minimum to get the product up and running.

If you have extra time, you can add more features.

## Simplify user Authentication

- Can soak up a lot of time
- Would be very easy burning a week doing this

Use a STUB

```js
app.get('/login:id', (req, res) => {
  req.session.userId = req.params.id
  res.redirect('/')
})
```

Populate the userId database table by having a userId column in the database.

DO NOT USE OAUTH OR WASTE TIME ON THIS.

Think about how you are presenting this. We will only spend 2 seconds talking about logging in. Do not waste time on this.

## Frames

- part of the planning session
- sketch a wireframe for every page you plan to build as a very low resolution versin.
-

![example wireframe](https://www.comentum.com/images/wireframes-sample/ecommerce/home.png)

## Building the flow

- build the flow of the website

![flow example](https://assets.justinmind.com/wp-content/uploads/2020/08/user-flows-ecommerce.png)

Building the flow and mockup (wireframe) will allow you to make sure you have the right routes and the right content.

## Data

### Building the ERD

- Build an Entity relationship diagram (ERD)
- base it on the user stories to determine the tables and columns
  - if you want to block a user...you need a user table!

### Routes

- write a list of the routes you will need

#### Building routes

- create routes with REST conventions
- specify each method and property grouping them by entity
  - all the blog post routes
  - all the user routes
  - all the comment routes

## Stack Choices

Bootstrap? Sass? jQuery? Node and express? Postgres?

Biggest choice will be to do a multipage app, or a single page app.

Single page apps are much more modern! Make it just like Tweeter. Use DOM manipulation to make it look like Tweeter.

## Dividing Tasks

Horizontal Approach

- break project into technical domains (frontend, backend, database)
- is very specialist

Vertical Approach

- prioritize features
- break project into features
- each dev is responsible for a single feature

## Communication

- single most important skill of a developer
- important for communicating with non-developers

### Daily Scrum

- daily scrum is a daily meeting where you get to talk to your team
- T: Today - you worked on what (what have you been working on)
- R: Roadblocks - what are the roadblocks? What are you having issues with
- W: Wins - describe what you accomplished today
- %: Estimated percentage of completion

## How to setup the project

- Do the activities in Compass for database and git setup

### How to set it up

1. Create exactly ONE github repo
2. add team members as collaborators
3. one person clone the skeleton code. One repo based on the skeleton code
4. change the remote to the new repo
   1. we want to push changes to the new repo. NOT the skeleton repo.
5. Everyone else clones the new repo.
6. Do the getting started section of the read me on one persons computer
   1. making the seeds file for the database
   2. (each person has their own database, but you want to start with the same database)

## Git workflow

- agree on a git workflow
- follow the same workflow

---

### Rules of git workflow

- DO NOT COMMIT TO THE MAIN BRANCH
- Solve the merge conflicts on your local dev machine

1. create a new branch
2. make some commits
3. git check main -> (git pull) merge it into feature branch --> fix any merge conflicts on feature branch
   1. this ensures the code is compatible with the main branch
   2. commit after all the merge conflicts are resolved
4. git checkout main
   1. then merge feature branch into main branch
   2. then git push main to github

- should do a merge of main into the feature branch more often than not! Will get less major conflicts.

Industry standard is to use the github pull request feature. This is handled on the github website. The merges are being done on the command line.

- When the fearture branch is ready to go, you **push** the featrure branch to github.
- Then you make a pull request.
  - you are saying you want to merge this into main
  -

## Summary

- User stories
- Feature list
- MVP - sort the features by priority
