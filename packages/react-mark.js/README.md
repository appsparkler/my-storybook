# React Mark JS (Inspired by [mark.js](https://markjs.io))

## [CodeSandbox DEMO](https://codesandbox.io/s/inspiring-cartwright-2v4ld?file=/src/App.js)

## Marking a String

```js
import { Marker } from 'react-mark.js'
// OR
import Marker from 'react-mark.js/dist/components/Marker'

const MyComponent = () => <Marker mark="o">Hello World</Mark>

// OR (with array)

const MyComponent = () => <Marker mark={['o', 'W']}>Hello World</Mark>
```

<img src="https://raw.githubusercontent.com/appsparkler/my-storybook/master/packages/react-mark.js/docs/string-example.png" />

## Marking a Regular Expression (RegEx)

```js
import { RegExpMarker } from 'react-mark.js'
// OR
import RegExpMarker from 'react-mark.js/dist/components/RegExpMarker'

const MyComponent = () => (
  <RegExpMarker
    mark={/l/}
    options={
      {
        /*optional*/
      }
    }
    unmarkOptions={
      {
        /*optional*/
      }
    }
  >
    Hello World
  </Mark>
)
```

<img src="https://raw.githubusercontent.com/appsparkler/my-storybook/master/packages/react-mark.js/docs/regex-example.png" />

## Marking a Range

```js
import { Mark } from 'react-mark.js'
// OR
import Mark from 'react-mark.js/dist/components/Mark'

const MyComponent = () => (
  <Mark
    mark={[
      {
        length: 3,
        start: 1,
      },
      {
        length: 4,
        start: 6,
      },
    ]}
    type="markRanges"
  >
    0123456789
  </Mark>
)
```

<img src="https://raw.githubusercontent.com/appsparkler/my-storybook/master/packages/react-mark.js/docs/ranges-example.png" />
