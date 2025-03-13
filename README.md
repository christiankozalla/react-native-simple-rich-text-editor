# react-native-simple-rich-text-editor

A lean Rich Text Editor for React Native built upon TextInput outputting Markdown

## Installation

```sh
npm install react-native-simple-rich-text-editor
```

## Usage

The Rich Text Editor is a controlled component that takes a `text` prop and an `onEmitText` prop.

```js
// React-Native Simple Rich Text Editor example
// From ./example/src/App.tsx
// Run this code via `yarn example`
import RichTextEditor from 'react-native-simple-rich-text-editor';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [markdownText, setMarkdownText] = useState(
    '# Hello World\nA paragraph.'
  );

  return (
    <View style={styles.container}>
      <RichTextEditor text={markdownText} onEmitText={setMarkdownText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

```

## Roadmap

Currently, in the beta version, the editor component emits text that contains the formatting markers used internally. In the first release, markdown formatted text may be passed initially and the editor will also emit proper markdown - but only supporting a limited set of markdown features, such as headings, bold and italic font styles and unordered lists, maybe links.

### Features planned

- Load markdown text on startup and render everything that is supported in the editor. Everything that is not supported stays unchanged.
- Emit markdown through onEmitText callback.
- (Enable user, i.e. the developer who uses the editor in their app, to fetch the markdown text. Effectively eliminating the need to compile to markdown on every keystroke.)
- Headings H1, H2, H3 ✅
- Bold and italic font styles ✅
- Unordered List ✅
- (Customizeable Toolbar)


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
