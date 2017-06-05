# Command-Line Usage

Once you have [downloaded](https://github.com/meta-memes/meta-memes/archive/master.zip) [the repo](https://github.com/meta-memes/meta-memes) you can `cd` into the directory and run

```bash
meta-memes --help
```

And you should get:

```bash
meta-memes: usage: meta-memes [options] [code]
-h   --help        Display this help message and exit.
-p   --pipe        Use piped code for input.
-s   --stdin       Use stdin for input.
-v   --verbose     Extra logging stuff.
-f   --file        Use a file for input
-t   --compile-str Compile a string to code that you can use.
-c   --compile     Compile without running.
code           The meta-memes code to run.

See more details at https://github.com/meta-memes/meta-memes/blob/master/docs/cmd.md (https://git.io/vHUJX)`

If you get:

```bash
meta-memes: command not found
```
or
```bash
-bash: meta-memes: command not found
```
or
```batch
'meta-memes' is not recognized as an internal or external command, operable program or batch file.
```

Then you may need to run `npm link` first. If the issue still persists, [open a bug report](https://github.com/meta-memes/meta-memes/issues/new).

## Hello, World!

Type `meta-memes --file helloworld2.meme`. 

How did that work? (See [README.md](README.md)). Try `cat helloworld2.meme` (or `type helloworld2.meme` on windows) and you get this:

```Meta Memes
I want an avocad
Crossed out 4 is still 4
Geobits downvotes
Crossed out 444 is still 444
Code review
This submission is written in Foo
This submission is written in TinyMUSH
This submission is written in Foo
This submission is written in TinyMUSH
This submission is written in Foo
Crossed out 444 is still 444
Outgolfed by Dennis
O_O # ಠ_ಠ  won't work here
Outgolfed by Dennis
Outgolfed by Dennis
Crossed out 44 is still 44
Geobits downvotes
This submission is written in Foo
Crossed out 444 is still 444
This submission is written in Foo
Abandon all work ye who enter here
This submission is written in Foo
This submission is written in TinyMUSH
Crossed out 444 is still 444
Chat stars
Outgolfed by Dennis
This submission is written in TinyMUSH
```
At 749 bytes, it's not the shortest, but it works! But it gets better:

Run `meta-memes --compile --file helloworld2.meme`

