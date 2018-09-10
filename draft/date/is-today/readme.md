# isToday(date): Boolean

Checks if a date is today.

## Usage

```js
import isToday from 'doremi/date/is-today';

// Today is 22 Mar 2015

isToday(new Date(2015, 2, 22));
// => true

isToday(new Date(2015, 2, 21));
// => false

isToday(new Date(2015, 2, 23));
// => false
```