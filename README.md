# codename-generator

![Version](https://img.shields.io/npm/v/codename-generator.svg?style=plastic)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/acf4ae9001a0486497a4b12c4ccbbd44)](https://www.codacy.com?utm_source=bitbucket.org&amp;utm_medium=referral&amp;utm_content=MarkSMurphy/codename-generator&amp;utm_campaign=Badge_Grade)![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/codename-generator.svg?style=plastic)
![Downloads](https://img.shields.io/npm/dm/codename-generator.svg?style=plastic)
![Licence](https://img.shields.io/npm/l/codename-generator.svg?style=plastic)

Have you ever needed to give something a code name, perhaps a project you're working on, but your imagination has let you down?
Use `codename-generator` to suggest random code names.

It has a small dictionary of a few thousand inoffensive adjectives and nouns which are picked at random to generate a suggested code name.
By default a screen full of suggestions (based upon the property `node -p process.stdout.rows`).

```text
codename-generator
```

![`codename-generator`](https://marksmurphy.github.io/img/codename-generator-screenfull.gif)

Or you can specify how many you'd like generated.

```text
codename-generator 15
```

![`codename-generator 15`](https://marksmurphy.github.io/img/codename-generator-15.gif)

Full usage details are available via the help screen.

```text
codename-generator --help
```

![`codename-generator --help`](https://marksmurphy.github.io/img/codename-generator-help.gif)
