# Change Log

## [1.2.1] - January 6<sup>th</sup> 2026

### Changed

- Added input validation for numeric parameter (0 < n <= 1000)
- Modernised JavaScript:
  - Updated all var declarations to const/let
  - Converted CommonJS to ES Modules
- Fixed process.exit() usage
- Updated ESLint ecmaVersion to 2022
- Added optional chaining, nullish coalescing, and template literals
- Replaced getRandomInt() with randomRange()
- Improved error handling in catch blocks
- Extract magic numbers to named constants
- Updated package.json engines.node and check bin value
- Updated Dependencies

## [1.2.0] - June 7<sup>th</sup> 2022

### Changed

- Changed all `nsf` references to `nsfw` as it should have been and it annoyed me a little. The old `--nsw` switch still works, as does `--nsfw`.
- Updated `debug` to version `4.3.4`.

---

## [1.1.4] - February 20<sup>th</sup> 2022

### Changed

- Updated `debug` to version `4.3.3`.

---

## [1.1.3] - November 12<sup>th</sup> 2021

### Changed

- Updated `chalk` to version `4.1.2`.
- Updated `debug` to version `4.3.2`.

---

## [1.1.2] - June 17<sup>th</sup> 2021

### Changed

- Updated `pretty-error` to version `3.0.4`.

---

## [1.1.1] - June 11<sup>th</sup> 2021

### Security

- Updated `css-what` package deep in the dependency tree to mitigate [CVE-2021-33587](https://www.npmjs.com/advisories/1754).

---

## [1.1.0] - May 11<sup>th</sup> 2021

### Added

- Added `--nsw` mode which generates **Not Safe for Work** code names.

### Changed

- Updated dependency `chalk` to version `4.1.1`.

---

## [1.0.15] - January 28<sup>th</sup> 2021

### Added

- Added `CHANGELOG.md`.
- Added *Required Node Version* ![node-current](https://img.shields.io/node/v/codename-generator?style=social) badge to `README.md`.
- Added link to `CHANGELOG.md` to `README.md`.

### Changed

- Fixed a bug with random number generation which could cause `undefined` to be returned due to out-of-bounds array access.
- Updated dependency `pretty-error` to version `3.0.3`.
- Updated dependency `supports-color` to version `8.1.1`.
- Removed broken *Size* badge from `README.md`.

---
