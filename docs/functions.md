# Full List of Functions

## Terms ~~and Conditions~~

TS
: Top of Stack

STS
: Second-to-Top of Stack

## List

### `0` / `PPCG`
Separates code into blocks. Useful when you want the default option explicitly.

`1` / `Java is too verbose`
Starts a number. Each digit is subtracted -1 from its value (from `123ABC` to `0129ab`) and then converted from base 15 to base 10.

`2` / `I want an avodad`
Starts a string. Each digit is subtracted -1 from its value (from `123ABC` to `0129ab`), then every 2 digits converted to their UTF-8 value. (eg. from `29` to `)`)

`3` / `Outgolfed by Dennis`
Starts a compressed string (this is not currently supported in the intepreter due to bugs in `shoco.js`). Useful for outgolfing Dennis.

`4` / `This submission is written in TinyMUSH`
Stop program execution *now* if TS is [falsey](truthyandfalsey.md)

`5` / `Crossed out 4 is still 4`
Move first stack element to last, `[1, "hi", /lol/g]` → `["hi", /lol/g, 1]`.

`6` / `Crossed out 44 is still 44`
Opposite of 5. `["hi", /lol/g, 1]` → `[1, "hi", /lol/g]`

`7` / `Crossed out 444 is still 444`
Remove first stack element.

`8` / `This submission is written in Foo`
Remove TS (pop).

`9` / `Stealth Ping`
Remove STS.

`10` / `Abandon all work ye who enter here`
Start a regex. Interpreted just like a string, just pushes a regex when done. The `g` flag is set by default.

`11` / `Chat stars`
Push the STS split by the TS element. You can split with regexes. Equivalent to JS's `String#split` method.

`12` / `Code review`
Push STS + TS.

`13` / `Geobits downvotes`
Push STS * TS.

`14` / `Carrot`
Push STS repeated TS times.

`15` / `ಠ_ಠ`
Stop the program *now*.

## Other Links

 - [Meme list](memes.md)
 - [Stack-modifying functions](stack.md)
 - [What's truthy and falsey](truthyandfalsey.md)