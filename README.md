# React draggable tabs
The plugin is inspired by [Atom](https://atom.io/) and allows you to use these beautiful tabs in your React App
![./screenshot.png](screenshot of the tabs)

# Usage
You can import the Tabs component
```js
import Tabs from "react-draggable-tabs"

...

<Tabs />
```

The Tabs component requires 4 props:
- `tabs`: an array of tabs, ever tab is an object and has to contain an id and a content (string or React element), e.g. `tabs = [{id:1, content: "Tab 1"}, {id:2, content: "Tab 2"}]`
- `moveTab(dragIndex, hoverIndex)`: a function handling the drag action, it receives the index in the array of the dragged item and of the landing place
- `selectTab(selectedIndex)`: handles the click event, it receives the index of the clicked tab
- `closeTab(selectedIndex)`: handles the remove event, it receives the index of the closed tab

# Example
Checkout the live example [here](zaninandrea.github.io/react-draggable-tabs) or the code [here](https://github.com/ZaninAndrea/react-draggable-tabs/tree/master/example)
