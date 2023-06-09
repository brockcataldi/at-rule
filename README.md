# At Rule

A shorthand parser for @media

## Install

This isn't added anywhere yet

## Usage

### `mediaQuery(query: string) => string` 

The main function for parsing the At Rule Query.

```javascript
import { mediaQuery } from 'at-rule';

mediaQuery('width > 400px');
// returns '(min-width: 400px)'
```

### `media(query: string) => string` 

This appends `@media` to the resultant value of `mediaQuery` 

```javascript
import { media } from 'at-rule';

media('width > 400px');
// returns '@media (min-width: 400px)'
```

### `mq(query: string) => string` 

The shorthand function for `mediaQuery`

```javascript
import { mq } from 'at-rule';

mq('width > 400px');
// returns '(min-width: 400px)'
```

### `m(query: string) => string` 

The shorthand function for `media`

```javascript
import { m } from 'at-rule';

m('width > 400px');
// returns '@media (min-width: 400px)'
```

## Syntax

### Operators

| Operator | Description                        |
| -------- | ---------------------------------- |
| `&`      | And                                |
| `:`      | Equals                             |
| `>=`     | Greater than or Equal to           |
| `<=`     | Less Than or Equal to              |
| `>`      | Alias for Greater than or Equal to |
| `<`      | Alias for Less than or Equal to    |

### Shortcuts

| Shortcut         | Result                          |
| ---------------- | ------------------------------- |
| `any-hover`      | `(any-hover: hover)`            |
| `any-coarse`     | `(any-pointer: coarse)`         |
| `any-fine`       | `(any-pointer: fine)`           |
| `hover`          | `(hover: hover)`                |
| `coarse`         | `(pointer: coarse)`             |
| `fine`           | `(pointer: fine)`               |
| `portrait`       | `(orientation: portrait)`       |
| `landscape`      | `(orientation: landscape)`      |
| `dark`           | `(prefers-color-scheme: dark)`  |
| `light`          | `(prefers-color-scheme: light)` |

## Examples

