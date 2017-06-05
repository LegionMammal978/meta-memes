# The Stack
The stack is like an array or list and it can contain regexes, strings, or numbers.

The number, string, and regex literals are pushed to the stack. These are some functions that modify the stack:

| Number | What it does |
|:---|:---|
| 5 | Removes the first stack element and pushes it to the stack. `[1, "hi", /lol/g]` → `["hi", /lol/g, 1]` |
| 6 | Opposite of 5. `["hi", /lol/g, 1]` → `[1, "hi", /lol/g]` |
| 7 | Remove first stack element. |
| 8 | Remove last stack element. |
| 9 | Remove second-to-last stack element. |
