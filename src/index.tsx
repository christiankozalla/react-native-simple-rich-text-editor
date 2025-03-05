/**
 * React Native Simple Rich Text Editor
 *
 * Documentation of the public API:
 * - SimpleRichTextEditor Component
 * -> let user specifiy when to emit (e.g. on keyboard dismiss)
 * -> let user pass custom H1, H2, Bold, Italic, List buttons
 *
 * Internals:
 * - RichTextEditor is a controlled component. The user provides `state` and `setState` to receive markdown output.
 * - Only a subset of markdown will be supported. Unsupported markdown like images will be rendered as plain markdown text.
 * - Receive text prop -> convert markdown to internal representation -> render
 * - onEmitText: convert internal representation to markdown -> setState(markdown)
 *
 * Usage Example:
 *
 * ```typescript
 * import RichTextEditor from "react-native-simple-rich-text-editor";
 * import { useState } from "react";
 *
 *
 * const Screen = () => {
 *  const [markdownText, setMarkdownText] = useState("# Hello World\nA paragraph."); // or with backticks ``
 *
 *  return (
 *    <RichTextEditor text={markdownText} onEmitText={setMarkdownText} style={styles.editor} />
 *  );
 * };
 * ```
 */
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
} from 'react-native';
import { Render } from './internal/rendering/components/Render.tsx';
import { addHeadlineMarker } from './internal/text-formats/unicode-markers-format/text-manipulation.ts';
import { Markers } from './internal/text-formats/unicode-markers-format/markers.ts';

const RichTextEditor = ({
  text,
  onEmitText,
}: {
  text: string;
  onEmitText: Dispatch<SetStateAction<string>>;
}) => {
  // Track the current selection (cursor position) in the TextInput.
  const [selection, setSelection] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          title="H1"
          onPress={() =>
            onEmitText(addHeadlineMarker(Markers.H1, text, selection))
          }
        />
        <Button
          title="H2"
          onPress={() =>
            onEmitText(addHeadlineMarker(Markers.H2, text, selection))
          }
        />
        <Button
          title="H3"
          onPress={() =>
            onEmitText(addHeadlineMarker(Markers.H3, text, selection))
          }
        />
      </View>
      <TextInput
        multiline
        style={styles.input}
        onSelectionChange={(
          e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
        ) => setSelection(e.nativeEvent.selection)}
        onChangeText={onEmitText}
      >
        <Render encodedText={text} />
      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  input: { flex: 1, textAlignVertical: 'top' },
});

export default RichTextEditor;
export { RichTextEditor };
