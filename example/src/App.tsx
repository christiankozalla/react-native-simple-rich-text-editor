import RichTextEditor from 'react-native-simple-rich-text-editor';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [markdownText, setMarkdownText] = useState(
    '# Hello World\nA paragraph.'
  ); // or with backticks ``

  return (
    <View style={styles.container}>
      <RichTextEditor text={markdownText} onEmitText={setMarkdownText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
