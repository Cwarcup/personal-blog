---
title: Basics of Go
date: '2022-11-7'
tags: ['Go']
images: '/static/images/individualBlogPostImages/learning-go.jpg'
draft: true
summary: 'Go is a programming language that is gaining popularity. It is a statically typed language that is compiled and has a garbage collector. It is a language that is easy to learn and has a lot of resources available for learning. In this article, we will learn the basics of Go.'
---

<TOCInline toc={props.toc} toHeading={3} indentDepth={3} />

# Basics of Go

## Running a Go program

We can use the `go` cli to perform a variety of tasks:

| Command      | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| `go build`   | **Compiles** a bunch of go source code files                   |
| `go run`     | **Compiles** and **executes** one or two files                 |
| `go fmt`     | **Formats** all the code in each file in the current directory |
| `go install` | Compiles and "installs" a package                              |
| `go get`     | Downloads the raw source code of someone else's package        |
| `go test`    | Runs any tests associated with the current project             |

## Go Packages

Think of a package as a collection of code files each ending in `.go`. A package is a way to group together related code. For example, the `fmt` package contains code for formatting text. The `math` package contains code for mathematical operations. The `net/http` package contains code for making HTTP requests.

In order for a file to be part of a package, it must start with a line of code that looks like this:

```go
package main
```

### Types of Go Packages

There are two types of packages:

- Executable: Generates a file that we can run. Are used for 'doing things' like running a server or a command line tool.
- Reusable: Code used as 'helpers'. Good place to put reusable logic. Think of these are libraries.

How do we know if we are making a reusable or executable package? We can tell by the package name. If the package name is `main`, then it is an executable package. If the package name is anything else, then it is a reusable package.

`main` is a special package name. It tells the Go compiler that the package should compile as an executable program instead of a reusable package.

Anytime we create an executable package, we need to have a function called `main` with no arguments and no return values. This is the entry point for our program.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## Imports and Packages

We use the `import "fmt"` package to give `main` access to the `fmt` package. The `fmt` package contains functions for formatting text. We use the `fmt.Println` function to print the string `"Hello, World!"` to the terminal.

Think of our `main` package as a separate program. In order to give it access to the `fmt` package, we need to import it. We have other packages that we can import as well. For example, the `math` package contains functions for mathematical operations.

We are not limited to importing packages that are part of the standard library. We can also import packages that are written by other people. These are called third-party packages. We can import third-party packages by using the `go get` command.

```go
package main

import (
    "fmt"
    "math"
    "calculator"
    "uploader"
)
```

### Standard Library Packages

We can see a list of all the standard library packages [here](https://pkg.go.dev/std).

## Functions

We can define a function by using the `func` keyword. We can define a function that takes zero or more arguments and returns zero or more values.

### Receivers

We can define a function that is associated with a particular type. We do this by creating a receiver. A receiver is just a parameter that is defined in our function definition with a type. The receiver is defined before the function name.

```go
// create a new type of 'deck'
// which is a slice of strings

type deck []string

// loop through the deck and print each card
func (d deck) print() {
	for i, card := range d {
		fmt.Println(i, card)
	}
}
```

Any variable of type `deck` now gets access top the `print` method.

```go
cards := deck{"Ace of Diamonds", newCard()}
cards.print()

// Output:
// 0 Ace of Diamonds
// 1 Five of Diamonds
```

### Multiple Return Values

We can return multiple values from a function. We can do this by separating the return types with a **comma**.

```go
// pass in a deck and the number of cards you want to deal
// returns two decks, the first is the hand and the second is the remaining deck
func deal(d deck, handSize int) (deck deck) {
	// return everything from the start of the deck to the handSize
	// and everything from the handSize to the end of the deck
	return d[:handSize], d[handSize:]
}
```

We can use this in our main function to deal a hand of cards. However, the `deal` function returns two values.

<div className="flex justify-center">
  <Image
    src="/static/images/individualBlogPostImages/go-returning-two-values.svg"
    alt="two return values"
    width={500}
    height={250}
  />
</div>

If we do not want to use one of the return values, we can use the **blank identifier**. The blank identifier is an underscore (`_`). We can use the blank identifier to tell Go that we are intentionally not using a value.

```go
func main() {
	cards := newDeck()
	hand, _ := deal(cards, 5)
	hand.print()
}
```

## Creating a Variable

We can create a variable by using the `var` keyword. We can create a variable that is set to a specific value or we can create a variable without a value and then later assign a value to it.

The syntax for creating a variable is:

```go
var name type = value
```

```go
var name string = "Todd"
var age int = 45
var isCool bool = true
var size float32 = 2.3
```

> These are the basic types in Go. There are more.

Go is a **statically typed** language. This means that once a variable is declared with a certain type, it can only ever be that type. We cannot change the type of the variable later on.

| Dynamic Typing | Static Typing |
| -------------- | ------------- |
| JavaScript     | Go            |
| Python         | C++           |
| Ruby           | Java          |

### Functions and Return Types

We need to tell the Go compiler what type of value we are returning from a function. We do this by adding the type after the closing parenthesis of the function parameters.

```go
func newCard() string {
  return "Five of Diamonds"
}
```

> If we do not return a value, the function will return nothing.

## Shorthand with inferred types

We can depend on the Go compiler to **infer** the type of the variable based on the value that we assign to it. We can use the shorthand syntax to create a variable.

```go
name := "Todd"
age := 45
isCool := true
size := 2.3
```

Only have to use the `:=` when we first initialize a variable. After that, we can use the `=` operator.

```go
name := "Gilligan"
name = "Skipper"
```

## Slices

Go has two data types for storing multiple values: arrays and slices. Arrays are fixed length. Slices are dynamic length.

Every `slice` must be the same data type.

### Creating a Slice

We can create a slice by using `[]` and specifying the type of the slice.

```go
func main() {
  cards := []string{"Ace of Diamonds", newCard()}

	fmt.Println(cards)
}

// function that will return the name and type of a card
func newCard() string {
  return "Five of Diamonds"
}
```

## For Loop - Iterating Over a Slice

```go
func main() {
  cards := []string{"Ace of Diamonds", newCard()}
  cards = append(cards, "Six of Spades")

  for i, card := range cards {
    fmt.Println(i, card)
  }
}

// function that will return the name and type of a card
func newCard() string {
  return "Five of Diamonds"
}

// Output
// 0 Ace of Diamonds
// 1 Five of Diamonds
// 2 Six of Spades
```

The syntax for a `for` loop is:

```go
for index, card := range cards {
  fmt.Println(index, card)
}
```

`range` is a keyword that allows us to iterate over a slice. It returns two values: the index of the current item and a copy of the item itself. We also used `:=` to create a new variable called `card` inside of the `for` loop. This variable is only available inside of the `for` loop.

If we are not using the index, we can use the underscore `_` to tell the Go compiler that we don't want to use this variable.

```go
for _, card := range cards {
  fmt.Println(card)
}
```

### Selecting Items from a Slice

We can simply access item on a slice by using the index.

```go
// example slice
fruits := []string{"apple", "orange", "banana"}

// access the first item
fmt.Println(fruits[0])

// output
// apple
```

We also have access to some special functions built into Go:

#### Specifying a Range

```go
fruits[startIndexIncluding : upToNotIncluding]
```

```go
// example slice
fruits := []string{"apple", "orange", "banana", "kiwi"}

// access the first two items
fmt.Println(fruits[0:2])

// output
// [apple orange]
```

We can optionally leave out the starting index or the ending index. If we leave out the starting index, it will start at the beginning of the slice. If we leave out the ending index, it will go all the way to the end of the slice.

```go
// example slice
fruits := []string{"apple", "orange", "banana", "kiwi"}

// access the first two items
fmt.Println(fruits[:2]) // [apple orange]

// access the last two items
fmt.Println(fruits[2:]) // [banana kiwi]
```

## Saving Data to a File

How do we interact with the file system? We can use the `os` package. Learn more [here](https://pkg.go.dev/os@go1.19.3#WriteFile)

```go
func WriteFile(name string, data []byte, perm FileMode) error
```

```go
package main

import (
  "fmt"
  "io/ioutil"
  "os"
)

func main() {
  cards := []string{"Ace of Diamonds", newCard()}
  cards = append(cards, "Six of Spades")

  // create a file
  file, err := os.Create("my_cards.txt")

  // check for errors
  if err != nil {
    fmt.Println("Error:", err)
    return
  }

  // write to the file
  fmt.Fprint(file, cards)

  // close the file
  file.Close()
}

```

### Type `[]byte`

```go
func WriteFile(name string, data []byte, perm FileMode) error
```

The `WriteFile` function takes in a `[]byte` as the second parameter. What is a `[]byte`? It is a slice of bytes. A byte is a unit of data that is 8 bits long. A byte can hold a number between 0 and 255.

Go uses the decimal system. The number 255 is the largest number that can be represented by a single byte. The number 256 is the smallest number that cannot be represented by a single byte. It is essentially a more efficient way of storing data.

## Type Conversion

We can convert a `[]string` to a `[]byte` by using the `[]byte` function.

```go
[]typeWeWant("value we have")
```

```go
package main

import "fmt"

func main() {
	greeting := "hi there!"
	fmt.Println([]byte(greeting)) //[104 105 32 116 104 101 114 101 33]
}
```

## Reading Data from a File

We can use the `os` package to read data from a file. Learn more [here](https://pkg.go.dev/os@go1.19.3#ReadFile)

```go
func ReadFile(filename string) ([]byte, error)
```

```go
// read a deck from a file
func newDeckFromFile(filename string) deck {
	// read the file
	bs, err := os.ReadFile(filename)
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}

	// convert the byte slice to a string
	s := strings.Split(string(bs), ",")

	// convert the string to a deck
	return deck(s)
}

// main.go
func main() {
	cards := newDeck()
	hand, _ := deal(cards, 5)
	hand.saveToFile("my_cards")

	// create a new deck from a file
	newCards := newDeckFromFile("my_cards")
	newCards.print()

}
```

## Random Numbers

We have a function that accepts a `deck` type and shuffles the order of the cards, returning a shuffled deck.

```go
// shuffle the deck
// need to accept a deck, shuffle around the cards, and return the deck
func (d deck) shuffle() deck {
	// for each card in the deck
	for index := range d {
		// generate ran num between 0 and the length of the deck
		newPosition := rand.Intn(len(d) - 1)
		// swap the current card with the card at the random index
		d[index], d[newPosition] = d[newPosition], d[index]
	}

	// return the deck
	return d
}
```

However, we notice that the order of the cards is always the same. This is because the `rand` package uses a pseudo-random number generator. This means that the numbers are generated in a predictable way. We can use the `time` package to generate a truly random number.

```go
func (d deck) shuffle() deck {

	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)
	// for each card in the deck
	for index := range d {
		// generate ran num between 0 and the length of the deck
		newPosition := r.Intn(len(d) - 1)
		// swap the current card with the card at the random index
		d[index], d[newPosition] = d[newPosition], d[index]
	}

	// return the deck
	return d
}
```

We could use this in our `main` function to shuffle the deck.

```go
package main

func main() {
	cards := newDeck()
	cards.shuffle()
	hand, _ := deal(cards, 5)
	hand.print()
}
```

## Testing in Go

We do _not_ use Mocha, Jest, or Jasmine to test our code in Go. Instead, we can create a new file ending with `_test.go` and write our tests in there.

We can then run the tests by running `go test` in the terminal.

<div className="flex justify-center">
  <Image
    src="/static/images/individualBlogPostImages/go-testing.svg"
    alt="two return values"
    width={500}
    height={300}
  />
</div>

Getting started:

```go
func TestNewDeck(t *testing.T) {
 //...
}
```

- All tests accept `t` as the first argument
- `t` is a type of `*testing.T`

```go
func TestNewDeck(t *testing.T) {
	d := newDeck()
	// check the length of the deck
	if len(d) != 52 {
		t.Errorf("Expected deck length of 52, but got %v", len(d))
	}
}
```

- `t.Errorf` is used to log an error
- we can use `%v` to print the value of a variable

## Structs

We have access to a data structure known as a `struct`. A `struct` is a collection of fields. We can create a new `struct` by using the `type` keyword.

Think of a `struct` as an `object` in JavaScript. It is a collection of properties.

### Creating a Struct

We need to define all the different properties that we want to store in our `struct`. We can then create a value that matches the `struct` type.

```go
type person struct {
	firstName string
	lastName string
}
```

There are actually **three** ways of declaring a `struct`.

We can create a new `person` by using the `person` type.

```go
func main() {

// 1
	curtis1 := person{
		firstName: "Curtis",
		lastName:  "Warcup",
	}

// 2
	curtis2 := person{"Curtis", "Warcup"}

// 3
	var curtis3 person


	fmt.Println(curtis1) // {Curtis Warcup}
	fmt.Println(curtis2) // {Curtis Warcup}
	fmt.Println(curtis3) // { }
}
```

This is very similar to how we create a new object in JavaScript.

```js
const person = {
  firstName: 'Curtis',
  lastName: 'Warcup',
}
```

### Updating Struct Values with dot notation

In option three, we are creating a new `person` with the `person` type. However, we are not assigning any values to the properties. We can then assign values to the properties by using the `.` operator.

```go
func main() {
	var curtis person
	curtis.firstName = "Curtis"
	curtis.lastName = "Warcup"
	fmt.Println(curtis) // {Curtis Warcup}
}
```

When you create an empty `struct`, all the properties are set to their zero values.

```go
func main() {
	var curtis person
	fmt.Println(curtis) // { }
}
```

Depending on your `struct`, you will get different zero values.

| Type   | Zero Value |
| ------ | ---------- |
| string | ""         |
| int    | 0          |
| bool   | false      |
| float  | 0          |
| struct | {}         |
| slice  | nil        |

We can print the zero values by using the `%+v` verb.

```go
func main() {

	var curtis person
	fmt.Println(curtis)
	fmt.Printf("%+v", curtis)
}
```

### Embedding Structs

We can have a `struct` that contains other `structs`. This is known as **embedding**.

Maybe we have a `person` that has a `contactInfo` property. We can create a new `struct` for `contactInfo` and embed it in the `person` `struct`.

```go
type contactInfo struct {
	email string
	phone int
}

type person struct {
	firstName string
	lastName  string
	contact   contactInfo
}

func main() {

	var curtis person
	fmt.Printf("%+v", curtis) // {firstName: lastName: contact:{email: phone:0}}
}
```

You can also use the shorthand like so:

```go
type contactInfo struct {
	email string
	phone int
}

type person struct {
	firstName string
	lastName  string
	contactInfo
}
```

#### Creating a new Struct with Embedded Structs

```go
func main() {
	curtis := person{
		firstName: "Curtis",
		lastName:  "Warcup",
		contact: contactInfo{
			email: "curtis@email.com",
			phone: 123456789,
		},
	}

	fmt.Printf("%+v", curtis)
	fmt.Println(curtis.contact.email) // curtis@email.com
}

// output
// {firstName:Curtis lastName:Warcup contact:{email:curtis@email.com phone:123456789}}
```

If we used the shorthand for the `contactInfo` `struct`, we would need to use the `contactInfo` property to access the `email` property.

```go
func main() {
	curtis := person{
		firstName: "Curtis",
		lastName:  "Warcup",
		contactInfo: contactInfo{
			email: "curtis@email.com",
			phone: 123456789,
		},
	},

	fmt.Printf("%+v", curtis)
}
```

### Structs with Receiver Functions

We can create a function that accepts a `struct` as a parameter. We can then call this function on a `struct` value.

```go
package main

import "fmt"

type contactInfo struct {
	email string
	phone int
}

type person struct {
	firstName string
	lastName  string
	contactInfo
}

func main() {
	curtis := person{
		firstName: "Curtis",
		lastName:  "Warcup",
		contactInfo: contactInfo{
			email: "curtis@email.com",
			phone: 123456789,
		},
	}

	curtis.print()
}

// receiver function that accepts a person struct
func (p person) print() {
	fmt.Printf("%+v", p)
}
```

### Updating Struct Values with Receiver Functions and Pointers

#### Pointers in Go

Recall that in Go, we pass values by default. This means that when we pass a value into a function, we are passing a copy of that value. If we want to update the value, we need to pass a reference to the value.

When we say "pass by value", we are actually passing a copy of the value. This means that if we update the value inside the function, it will not update the value outside the function. The copy is made available to the function. The original value is not changed.

So how do we use **pointers** to update the original value?

We need to update our code a bit:

```go
type contactInfo struct {
	email string
	phone int
}

type person struct {
	firstName string
	lastName  string
	contactInfo
}

func main() {
	curtis := person{
		firstName: "Curtis",
		lastName:  "Warcup",
		contactInfo: contactInfo{
			email: "curtis@email.com",
			phone: 123456789,
		},
	}

	curtis.print() // {firstName:Curtis lastName:Warcup contactInfo:{email:

	curtisPointer := &curtis // get the memory address of the curtis variable
	curtisPointer.updateName("Stinky") // update the name to Stinky

	curtis.print() // {firstName:Stinky lastName:Warcup contact:{email:

}

func (p person) print() {
	fmt.Printf("%+v", p)
}

// updated function that accepts a pointer to a person
func (pointerToPerson *person) updateName(newFirstName string) {
	// update the value of the person's first name
	(*pointerToPerson).firstName = newFirstName
}
```

- `%variable`
  - This is a special character that we can use to print the memory address of a variable.
  - It gives you the memory address of the value this variable is pointing at.
- `*pointer`
  - This is an operator that we can use to get the value that the pointer is pointing at.

When we do `&curtis`, we are getting the memory address of the `curtis` variable. We are assigning this pointer to `curtisPointer`. We then go and call `.updateName("Stinky")` on `curtisPointer`. This is the same as calling `.updateName("Stinky")` on `&curtis`.

In our function, we changed the receiver from `person` to `*person`. This means that we are now passing a pointer to a `person` instead of a `person` value. We can then use the `*` operator to get the value that the pointer is pointing at. We can then update the value of the `firstName` property.

When we have a `*` in front of a type, it means that we are working with a **pointer to that type**.

When we have a `*` in front of a variable, it means that we want to **read/manipulate the value that the pointer** is referencing.

> Turn **address** into **value** with `*address`
>
> Turn **value** into **address** with `&value`

#### Pointer Shortcut

With Go, we can define a receiver function that accepts a pointer to a `person` instead of a `person` value. We can then use the `*` operator to get the value that the pointer is pointing at. We can then update the value of the `firstName` property.

```go
func main() {
	curtis := person{
		firstName: "Curtis",
		lastName:  "Warcup",
		contactInfo: contactInfo{
			email: "curtis@email.com",
			phone: 123456789,
		},
	}

	curtis.updateName("Stinky") // never used the & operator

	curtis.print()

}


func (p *person) updateName(newFirstName string) {
	// update the value of the person's first name
	(*p).firstName = newFirstName
}
```

> Need to make sure we have the `*` in front of the type when we define the receiver function. We don't need the `*` in front of the variable when we call the function.

#### Things to keep in mind with pointers in Go

Take this `slice` for example:

```go
package main

import "fmt"

func main() {
	mySlice := []string{"Hi", "There", "How", "Are", "You"}
	updateSlices(mySlice)
	fmt.Println(mySlice)

}

func updateSlices(s []string) {
	s[0] = "Bye"
}
```

If we run this, we get `["Bye", "There", "How", "Are", "You"]`. This is because we are passing a reference to the `slice` into the function. We are not passing a copy of the `slice`. So when we update the `slice` inside the function, we are updating the original `slice`.

Why didn't this occur when we used a `struct`?

### Reference vs Value Types

When we pass a `struct` into a function, we are passing a copy of the `struct`. We are not passing a reference to the `struct`. So when we update the `struct` inside the function, we are not updating the original `struct`.

| Arrays                 | Slices                                            |
| :--------------------- | :------------------------------------------------ |
| Primate data structure | Can grow and shrink                               |
| Can't be resized       | Used the majority of the time for lists of things |
| Rarely used            |                                                   |

Go has access to both `slices` and `arrays`. It's very rare we actually use `arrays` in Go. We use `slices` instead. A `slice` is like a fancy array. When we make a `slice`, Go internally makes two separate data structures: a `slice` and an `array`. The `slice` is a reference to the `array`. The `slice` is what we actually use. The `array` is what Go uses to store the data.

When we pass a `slice` into a function, we are passing a reference to the `slice`. We are not passing a copy of the `slice`. So when we update the `slice` inside the function, we are updating the original `slice`.

| Value Types | Reference Types |
| :---------- | :-------------- |
| int         | slice           |
| float       | map             |
| string      | channel         |
| bool        | pointer         |
| struct      | functions       |

For `value types`, when we pass the value into a function, we are passing a **copy of the value**. We are **not** passing a reference to the value. So when we update the value inside the function, we are not updating the original value. We **must** use pointers when we are changing the value of a `value type` inside a function.

For `reference types`, we do **NOT** need to worry about pointers.

## Maps

A `map` is a collection of `key:value` pairs.

| Language   | Name       |
| :--------- | :--------- |
| JavaScript | Object     |
| Python     | Dictionary |
| Ruby       | Hash       |
| Go         | Map        |

### Creating a Map

We have a few ways of making `maps`. However, unlike `structs` we can not use the dot `.` notation to update a `map`.

#### with `map`

```go
	colors := map[string]string{
	//...
	}
```

- `map` is the keyword
- `[string]` is the key type
- `string` is the value type

```go
	colors := map[string]string{
		"red":   "#ff0000",
		"green": "#4bf745",
		"white": "#ffffff",
	}
```

#### with `make`

We can also create an empty `map` and then add `key:value` pairs to it.

```go
	colors := make(map[string]string)
	colors["white"] = "#ffffff"
	colors["red"] = "#ff0000"

	colors.green = "#4bf745" // this will not work

	fmt.Println(colors) // map[white:#ffffff red:#ff0000]
```

We can do the same things but with `int` as the key type.

```go
	colors := make(map[int]string)
	colors[10] = "#ffffff"
	colors[20] = "#ff0000"

	fmt.Println(colors) // map[10:#ffffff 20:#ff0000]
```

#### with `var`

```go
	var colors map[string]string

	colors["white"] = "#ffffff"
	colors["red"] = "#ff0000"

	fmt.Println(colors) // map[red:#ff0000 white:#ffffff]
```

### Iterating over a map

```go
///          arg   map type
func printMap(c map[string]string) {
	for key, value := range c {
		//..
	}
}
```

Real example:

```go
package main

import "fmt"

func main() {
	colors := map[string]string{
		"red":   "#ff0000",
		"green": "#4bf745",
		"white": "#ffffff",
	}

	printMap(colors)
}

func printMap(c map[string]string) {
	for color, hex := range c {
		fmt.Println("Hex code for", color, "is", hex)
	}
}

// output
// Hex code for red is #ff0000
// Hex code for green is #4bf745
// Hex code for white is #ffffff
```

### Maps vs Structs

| Map                                                        | Struct                                                         |
| :--------------------------------------------------------- | :------------------------------------------------------------- |
| All keys are the **same type**                             | Keys can be **different types**                                |
| All values are the **same type**                           | Values can be **different types**                              |
| Keys are **indexed**. Can iterate over all key:value pairs | Keys are **not** indexed                                       |
| **Reference** type. Don't need to worry about pointers.    | **Value** type. Need pointers when making changes to a struct. |
| Don't need to know all the keys at compile time            | Need to know all the keys at compile time                      |

When to use a `map` vs a `struct`?

- use a `map` when you have a **very** closely related set of values.

## Interfaces

So we know that...

- every **value** has a **type** assigned to it.
- every **function** has to specify the type of its **arguments** and **return values**.

So does this mean that every function we ever write be rewritten to accommodate every type of value we ever want to pass into it?

Take for example the following code:

```go
package main

import "fmt"

type englishBot struct{}

type spanishBot struct{}

func main() {

	eb := englishBot{}
	sp := spanishBot{}

	printGreeting(eb)
	printGreetingSpanish(sp)

}

func (eb englishBot) getGreeting() string {
	// unique logic for generating an english greeting
	return "Hi There!"
}

func (sb spanishBot) getGreeting() string {
	// unique logic for generating a spanish greeting
	return "Hola!"
}

func printGreeting(eb englishBot) {
	fmt.Println(eb.getGreeting())
}

func printGreetingSpanish(sb spanishBot) {
	fmt.Println(sb.getGreeting())
}
```

This is **very** repetitive. We have to write two functions that do the same thing. We have to write two functions that take in two different types of arguments. We have to write two functions that return two different types of values.

How can we make this more **DRY**? We can do this by using an `interface`.

```go
package main

import "fmt"

// bot is an interface
type bot interface {
	getGreeting() string
}

type englishBot struct{}

type spanishBot struct{}

func main() {

	eb := englishBot{}
	sp := spanishBot{}

	printGreeting(eb)
	printGreeting(sp)

}

// printGreeting is a function that takes in a bot, NOT an englishBot or spanishBot
func printGreeting(b bot) {
	fmt.Println(b.getGreeting())
}

func (eb englishBot) getGreeting() string {
	// unique logic for generating an english greeting
	return "Hi There!"
}

func (sb spanishBot) getGreeting() string {
	// unique logic for generating a spanish greeting
	return "Hola!"
}
```

### Creating an interface

```go
type bot interface {
	getGreeting() string
}
```

What this is doing is saying anything with a function called `getGreeting` that returns a `string` is a `bot`. Since `englishBot` and `spanishBot` both have a function called `getGreeting` that returns a `string` they are both `bot`s.

<div className="flex justify-center">
  <Image
    src="/static/images/individualBlogPostImages/go-interfaces.svg"
    alt="two return values"
    width={500}
    height={250}
  />
</div>

For example, this would **NOT** work:

```go
package main

import "fmt"

type bot interface {
	getGreeting() string
}

type englishBot struct{}

type spanishBot struct{}

func main() {

	eb := englishBot{}
	sp := spanishBot{}

	printGreeting(eb)
	printGreeting(sp) // ERROR!

}

func printGreeting(b bot) {
	fmt.Println(b.getGreeting())
}

func (eb englishBot) getGreeting() string {
	// unique logic for generating an english greeting
	return "Hi There!"
}

func (sb spanishBot) getGreetingSpanish() string {  // this is not getGreeting
	// unique logic for generating a spanish greeting
	return "Hola!"
}
```

### Rules of interfaces

We can also have some more complex interfaces. For example:

```go
type bot interface {
	//  				⬇️ list of arg types
	getGreeting(string, int) (string, error)
	// ⬆️ func name 						 ⬆️ arg return types
}
```

You can also have functions that take in interfaces as arguments:

```go
type bot interface {
	getGreeting(string, int) (string, error)
	getBotVersion() float64
	respondToUser(string) string
}
```

---

- Interfaces are **not** generic types.
  - _Some other languages have 'generic' types_.
- Interfaces are **implicit**.
  - _We don't manually have to say that our custom type satisfies some interface._
  - _At no point in our code do we say that `englishBot` satisfies the `bot` interface._
  - _All we did was declare that `englishBot` has a function called `getGreeting` that returns a `string`._
- Interfaces are a **contract** to help us manage types.
  - _If you have a function that takes in an interface, you can pass in any type that satisfies that interface._

### Concrete types vs Interface types

Concrete types are types that we can create instances of. We can create instances of `englishBot` and `spanishBot` because they are concrete types.

```go
type englishBot struct {
}

func main() {
	eb := englishBot{} // this is a concrete type
}
```

Interface types are types that we cannot create instances of. We cannot create instances of `bot` because it is an interface type.

| Concrete type | Interface type |
| :------------ | :------------- |
| map           | bot            |
| struct        |                |
| int           |                |
| string        |                |
| englishBot    |                |

There is no way to create an instance of `bot` because it is an interface type. We can only create instances of concrete types.

###
