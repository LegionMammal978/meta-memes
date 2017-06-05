# What's Truthy and Falsey in Meta Memes?

Here's a table:

|Truthy|Falsey|
|--|--|
|`"hi"`|`""`|
|`1`|`0`|
|`-1000`|`0`|
|`0.1234`|`0`|
|`/</[^>]+>|<[^>]+></[^>]+>/g`|`//g`(empty regex, in the current interpreter this is in correctly truthy)|

Basically anything but `0`, the empty string, and an empty regex are all truthy.