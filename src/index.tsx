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
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
  type TextStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Render } from './internal/rendering/components/Render.tsx';
import {
  addFontStyleMarkers,
  addFontStyleEndMarker,
  addHeadlineMarker,
  addBulletPointMarker,
} from './internal/text-formats/unicode-markers-format/text-manipulation.ts';
import { Markers } from './internal/text-formats/unicode-markers-format/markers.ts';

// Debounce utility function
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

const RichTextEditor = ({
  text: externalText,
  onEmitText,
  emitTextAfterMillisecondsOfInactivity = 500,
  textInputStyles,
  buttonStyles,
  fontSize,
}: {
  text: string;
  onEmitText: Dispatch<SetStateAction<string>>;
  emitTextAfterMillisecondsOfInactivity?: number;
  textInputStyles?: StyleProp<TextStyle>;
  buttonStyles?: StyleProp<ViewStyle>;
  fontSize?: number;
}) => {
  // Internal state to track the current text value
  const [internalText, setInternalText] = useState(externalText);

  // Track the current selection (cursor position) in the TextInput.
  const [selection, setSelection] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const [needsBoldEndMarker, setNeedsBoldEndMarker] = useState(false); // we must count the BOLD_START and BOLD_END markers in text prop => inital state
  const [needsItalicEndMarker, setNeedsItalicEndMarker] = useState(false);

  // Create a debounced version of onEmitText
  const debouncedEmitText = useRef(
    debounce((newText: string) => {
      onEmitText(newText);
    }, emitTextAfterMillisecondsOfInactivity)
  ).current;

  // Update internal text when external text changes
  useEffect(() => {
    setInternalText(externalText);
  }, [externalText]);

  // Handle text changes
  const handleTextChange = useCallback(
    (newText: string) => {
      setInternalText(newText);
      debouncedEmitText(newText);
    },
    [debouncedEmitText]
  );

  const handleFontStyleMarkerInsertion = (style: 'bold' | 'italic') => () => {
    const isBold = style === 'bold';
    if (isBold ? needsBoldEndMarker : needsItalicEndMarker) {
      const { text: newText } = addFontStyleEndMarker(
        internalText,
        selection,
        style
      );
      isBold ? setNeedsBoldEndMarker(false) : setNeedsItalicEndMarker(false);
      handleTextChange(newText);
    } else {
      const { text: newText } = addFontStyleMarkers(
        internalText,
        selection,
        style
      );
      // this is a reaction to an implementation detail of addBoldMarkers - TODO: solve it cleanly
      if (selection.start - selection.end === 0)
        isBold ? setNeedsBoldEndMarker(true) : setNeedsItalicEndMarker(true);
      handleTextChange(newText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.button, buttonStyles]}
          onPress={() =>
            handleTextChange(
              addHeadlineMarker(Markers.H1, internalText, selection)
            )
          }
        >
          <Text style={styles.buttonText}>H1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, buttonStyles]}
          onPress={() =>
            handleTextChange(
              addHeadlineMarker(Markers.H2, internalText, selection)
            )
          }
        >
          <Text style={styles.buttonText}>H2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, buttonStyles]}
          onPress={() =>
            handleTextChange(
              addHeadlineMarker(Markers.H3, internalText, selection)
            )
          }
        >
          <Text style={styles.buttonText}>H3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, buttonStyles]}
          onPress={() =>
            handleTextChange(addBulletPointMarker(internalText, selection))
          }
        >
          <Text style={styles.buttonText}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.fixedWidth,
            buttonStyles,
            needsBoldEndMarker ? styles.endFontStyleButton : null,
          ]}
          onPress={handleFontStyleMarkerInsertion('bold')}
        >
          <Text
            style={[
              styles.buttonText,
              needsBoldEndMarker ? styles.endFontStyleText : null,
            ]}
          >
            Bold
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.fixedWidth,
            buttonStyles,
            needsItalicEndMarker ? styles.endFontStyleButton : null,
          ]}
          onPress={handleFontStyleMarkerInsertion('italic')}
        >
          <Text
            style={[
              styles.buttonText,
              needsItalicEndMarker ? styles.endFontStyleText : null,
            ]}
          >
            Italic
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        multiline
        autoFocus
        autoCorrect={false}
        style={[styles.input, { fontSize }, textInputStyles]}
        onSelectionChange={(
          e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
        ) => setSelection(e.nativeEvent.selection)}
        onChangeText={handleTextChange}
      >
        <Render encodedText={internalText} fontSize={fontSize} />
      </TextInput>
    </View>
  );
};

const electricBlueHex = '#009DDC';
const jasperRedHex = '#E03A3E';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  input: { flex: 1, textAlignVertical: 'top' },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: electricBlueHex,
    backgroundColor: 'white',
    flexShrink: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: electricBlueHex,
  },
  fixedWidth: {
    width: 80,
  },
  endFontStyleButton: {
    borderColor: jasperRedHex,
  },
  endFontStyleText: {
    color: jasperRedHex,
  },
});

export default RichTextEditor;
export { RichTextEditor };
