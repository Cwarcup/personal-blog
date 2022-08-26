---
title: What's the Deal with Linked Lists?
date: '2022-08-27'
tags: ['Linked Lists']
draft: false
summary:
---

# Data Structures

There will be a time where you start to hear more and more about data structures. You may have heard of them before, but you may not have known what they were. Before we get into linked lists, let's talk about data structures.

Data structures represent a way of organizing data. Depending on the type of data you are working with, you may need to organize it in a specific way. For example, if you are working on a list of names, you may want to store them in alphabetical order.

Depending on the data you are working with, you may need to organize it in a specific way.

# So what are Linked Lists?

Linked lists are nice because they actually have a structure to them.

Essentially, a linked list is a collection of **nodes** that are linked together. Each node has a value and a pointer to the next node in the list.

So this raises another question: what is a node?

Each node has the ability to store some piece of data, commonly referred to as a **value**. Additionally each node also has a **pointer** which is a reference to the next node in the list.

For example, if we wanted to store a linked list of values ranging from 1 to 3, we would have a linked list that looks like this:

![linked list](/public/static/images/linked-list/linked-list.png)

Each node has a value and a pointer to the next node in the list.

A metaphor for a linked list may be a treasure/scavenger hunt. You are given the first clue (the head) and you follow the clue (the pointer) to the next clue (the next node) and so on until you reach the end of the list (the tail).

![treasure hunt image]()

# What's unique about Linked Lists?

Linked lists are unique because they are a **linear data structure**. This means that there is a sequence and an order to how they are constructed and traversed.

In memory, we only have to keep track of two nodes in a list - the **head** and the **tail** node. The tail is technically optional, but it is helpful to have it. We will go into more detail about this later.

The head is the first node in the list and points to everything else.

From there, we can traverse the list by following the pointers to the next node until we reach the **tail**, which is the last node in the list and has a pointer to nowhere. We typically point the tail to `null` to indicate that it is the end of the list.

Wait, this kind of sounds like an array. What's the difference?

### Arrays vs Linked Lists

Arrays and linked lists are both linear data structures. They both have a sequence and an order to how they are constructed and traversed.

# When would I use a Linked List?

Therefore, it's very easy to add or remove items from the beginning of the list. We can simply create a new node and tell it to point to the current head. Then we can update the head to point to the new node.

![linked list](/public/static/images/linked-list/linked-list.png)

# linear vs non-linear data structures

## when to use a linear data structure

## when to use a non-linear data structure

# structure of a linked list

# types of linked lists

## dweteching loops in a linked list

##

# linked lists benefits

# linked lists drawbacks
