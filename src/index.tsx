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
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
} from 'react-native';
import { Render } from './internal/rendering/components/Render.tsx';
import {
  addFontStyleMarkers,
  addFontStyleEndMarker,
  addHeadlineMarker,
} from './internal/text-formats/unicode-markers-format/text-manipulation.ts';
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
  const [needsBoldEndMarker, setNeedsBoldEndMarker] = useState(false); // we must count the BOLD_START and BOLD_END markers in text prop => inital state
  const [needsItalicEndMarker, setNeedsItalicEndMarker] = useState(false);

  const handleFontStyleMarkerInsertion = (style: 'bold' | 'italic') => () => {
    const isBold = style === 'bold';
    if (isBold ? needsBoldEndMarker : needsItalicEndMarker) {
      const { text: newText } = addFontStyleEndMarker(text, selection, style);
      isBold ? setNeedsBoldEndMarker(false) : setNeedsItalicEndMarker(false);
      onEmitText(newText);
    } else {
      const { text: newText } = addFontStyleMarkers(text, selection, style);
      // this is a reaction to an implementation detail of addBoldMarkers - TODO: solve it cleanly
      if (selection.start - selection.end === 0)
        isBold ? setNeedsBoldEndMarker(true) : setNeedsItalicEndMarker(true);
      onEmitText(newText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onEmitText(addHeadlineMarker(Markers.H1, text, selection))
          }
        >
          <Text style={styles.buttonText}>H1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onEmitText(addHeadlineMarker(Markers.H2, text, selection))
          }
        >
          <Text style={styles.buttonText}>H2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onEmitText(addHeadlineMarker(Markers.H3, text, selection))
          }
        >
          <Text style={styles.buttonText}>H3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.fixedWidth]}
          onPress={handleFontStyleMarkerInsertion('bold')}
        >
          <Text style={styles.buttonText}>
            {needsBoldEndMarker ? 'Bold End' : 'Bold'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.fixedWidth]}
          onPress={handleFontStyleMarkerInsertion('italic')}
        >
          <Text style={styles.buttonText}>
            {needsItalicEndMarker ? 'Italic End' : 'Italic'}
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        multiline
        autoFocus
        autoCorrect={false}
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

const electricBlueHex = '#009DDC';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    margin: 8,
    flexDirection: 'row',
    gap: 8,
  },
  input: { flex: 1, textAlignVertical: 'top' },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: electricBlueHex,
    backgroundColor: 'white',
  },
  buttonText: {
    textAlign: 'center',
    color: electricBlueHex,
  },
  fixedWidth: {
    width: 100,
  },
});

export default RichTextEditor;
export { RichTextEditor };
