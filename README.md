# meta-memes
The Meta Memes programming language.

## Directory structure:

 - `README.md` This file.
 - `LICENSE` GPLv3
 - `cmd.js` Command-line interface. Accessed by the `meta-memes` command. For more info, see [docs/cmd.md](https://github.com/meta-memes/meta-memes/blob/master/docs/cmd.md)
 - `helloworld.meme`  A compiled "Hello, World!" program.
 - `helloworld2.meme` A decompiled "Hello, World!" program.
 - `index.js` Don't use this file.
 - `main.js` The main interpreter. Exposes `window.metaMemes` if `window` is available, otherwise `module.exports`.
 - `memes_raw.txt` A raw list of memes. See [docs/memes.md](https://github.com/meta-memes/meta-memes/blob/master/docs/memes.md) for more info.
 - `memes.txt` A list of the meme regexes.
 - `meta-memes` An empty file used by NPM. I think.
 - `package.json` Package for NPM.
 - `shoco.js` The string compressing library used by Meta Memes. Taken from https://github.com/Ed-von-Schleck/shoco.

## Docs & Tutorial

Go to [the README in the docs folder](https://github.com/meta-memes/meta-memes/blob/master/docs/README.md).

## Any questions?

[Open an issue.](https://github.com/meta-memes/meta-memes/issues/new)