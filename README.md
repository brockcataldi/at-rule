# At

A shorthand parser for @media (and @container in the future) 

## Operators

| Operator | Description                                      |
| -------- | ------------------------------------------------ |
| `:`      | Equals, the normal Media Query operator          |
| `>=`     | Greater Than or Equal To, Available in CSS4      |
| `<=`     | Less Than or Equal to, Available in CSS4         |
| `>`      | Alias for Greater Than or Equal to               |
| `<`      | Alias for Less Than or Equal to                  |

## Shortcuts

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