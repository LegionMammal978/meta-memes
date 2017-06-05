# Meta Memes

Welcome to the Meta Memes docs / tutorial!

Meta Memes is an esoteric, [code-golf](https://en.wikipedia.org/wiki/Code_golf) optimized programming language. Some of its syntax is based on [the memes of](https://codegolf.meta.stackexchange.com/q/5828/58826) [PPCG](https://codegolf.stackexchange.com). 

## Compiled or interpreted - How Meta Memes works
Kinda both. First it is compiled into *smaller code*, then interpreted, but it is common to write in the compiled form and just have that interpreted.

### Compiling

Let's say your program is:
```none
Java is too verbose
Outgolfed by Dennis
I want an avocado
Abandon all work ye who enter here
Chat stars
```
The compiler looks at you code and determines it is separated by newlines. It then splits the code into an array of strings like `Java is too verbose`. Then it looks through [some regexes](memes.md) to find which meme you mean. In this case:

`Java is too verbose` → 1
`Outgolfed by Dennis` → 3
`I want an avocado` → 2
`Abandon all work ye who enter here` → A
`Chat stars` → B

Memes go from `1` to `F` (hexadecimal.) That means that the compiled code for this program is `132AB`. Now you can open [a hex editor](https://hexed.it/) and enter in that code, and you will see your program is 2.5 bytes long.

But what does it do?

### Interpreting

Now the fun part.

#### Input

If there is any input, it is pushed to the stack before the program starts.

#### Execution

The interpreter reads `132AB`. It first sees if you are trying to start a number. In fact, the number `1` starts a number. So the interpreter takes the code from the `3` to the `B` to get `32AB`. It then subtracts 1 from each number's hex value to get `219A`. Then it pushes `219A` in base 15 (`7120` in base 10) to the stack. Wait, what's the stack?

#### [The Stack](stack.md)

The stack is like an array or list and it can contain regexes, strings, or numbers. Most functions take input from the stack and output by pushing (adding an element) to the stack.

#### The End and Output

At the end of your program execution, the last element of the stack is printed. (Better implicit output coming soon!)

That's it!

## Links ~~From Around the Web~~ to other stuff

 - [Info about the stack](stack.md)
 - [List of memes](memes.md)
 - [Full list of functions](functions.md)
 - [Docs on classeur.io](https://app.classeur.io/#!/folders/OY9LI0cZP9Pd8LjOfVKs)