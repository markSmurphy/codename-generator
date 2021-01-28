# codename-generator

![Version](https://img.shields.io/npm/v/codename-generator.svg?style=plastic)
![node-current](https://img.shields.io/node/v/codename-generator?style=plastic)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/acf4ae9001a0486497a4b12c4ccbbd44)](https://www.codacy.com?utm_source=bitbucket.org&amp;utm_medium=referral&amp;utm_content=MarkSMurphy/codename-generator&amp;utm_campaign=Badge_Grade)
![GitHub issues](https://img.shields.io/github/issues/markSmurphy/codename-generator?style=plastic)
[![Known Vulnerabilities](https://snyk.io/test/github/markSmurphy/codename-generator/badge.svg?targetFile=package.json)](https://snyk.io/test/github/markSmurphy/codename-generator?targetFile=package.json)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/codename-generator.svg?style=plastic)
![Downloads](https://img.shields.io/npm/dm/codename-generator.svg?style=plastic)
![Licence](https://img.shields.io/npm/l/codename-generator.svg?style=plastic)

## Overview

Have you ever needed to give something a code name?  Perhaps for a project you're working on, or a new screen-name, but your imagination has let you down?
Use `codename-generator` to suggest some random code names.

It has a small dictionary of a few thousand inoffensive adjectives and nouns which are picked at random to generate a suggested code name.
By default a screen-full of suggestions are made, so the larger your screen is, the more suggestions you'll have.

```text
codename-generator
```

![`codename-generator`](https://marksmurphy.github.io/img/codename-generator-screenfull.gif)

---

## Installation

```text
npm -g install codename-generator
```

---

## Options

You can use the `--help` option to list all of the options.

### Default (no options)

Don't supply any options and by default you'll get a screen-full of suggested code names (based upon the terminal's row count via the property `node -p process.stdout.rows`).

### <number>

Or you can specify how many you'd like generated:

```text
codename-generator 20
```

![`codename-generator 20`](https://marksmurphy.github.io/img/codename-generator-20.gif)

### --list-adjectives

Lists all ~1870 adjectives in the dictionary.

### --list-nouns

Lists all ~960 nouns in the dictionary.

### --no-color

Switches off colour output.  Useful if piping output somewhere which doesn't handle the unicode control codes.

### --version

Display the version number.

### --help

Display the help screen.

![`codename-generator --help`](https://marksmurphy.github.io/img/codename-generator-help.png)
