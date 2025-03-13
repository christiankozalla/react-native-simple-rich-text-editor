import RichTextEditor from 'react-native-simple-rich-text-editor';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [markdownText, setMarkdownText] = useState(
    '# Hello World\nA paragraph.'
  ); // or with backticks ``

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <RichTextEditor text={markdownText} onEmitText={setMarkdownText} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
