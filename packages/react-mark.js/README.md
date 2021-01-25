# React Mark JS (Inspired by [mark.js](https://markjs.io))

## Marking a String
```js
import {Mark} from 'react-mark.js'
// OR
import Mark from 'react-mark.js/dist/components/Mark'

const MyComponent = () => (
  <Mark
    mark="o"
    type="mark"
  >
    Hello World
  </Mark>
)
```
<img src="https://raw.githubusercontent.com/appsparkler/my-storybook/master/packages/react-mark.js/docs/string-example.png" />

## Marking a Regular Expression (RegEx)
```js
import {Mark} from 'react-mark.js'
// OR
import Mark from 'react-mark.js/dist/components/Mark'

const MyComponent = () => (
  <Mark
    mark={/l/}
    type="markRegExp"
  >
    Hello World
  </Mark>
)
```
<img src="https://raw.githubusercontent.com/appsparkler/my-storybook/tree/master/packages/react-mark.js/docs/regex-example.png" />

## Marking a Range
```js
import {Mark} from 'react-mark.js'
// OR
import Mark from 'react-mark.js/dist/components/Mark'

const MyComponent = () => (
  <Mark
    mark={[
      {
        length: 3,
        start: 1
      },
      {
        length: 4,
        start: 6
      }
    ]}
    type="markRanges"
  >
    0123456789
  </Mark>
)
```
<img src="https://raw.githubusercontent.com/appsparkler/my-storybook/tree/master/packages/react-mark.js/docs/ranges-example.png" />
