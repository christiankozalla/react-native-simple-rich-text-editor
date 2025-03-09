import { Text } from 'react-native';
import {
  ZWS,
  MARKER_STRING_LENGTH,
} from '../../text-formats/unicode-markers-format/constants.ts';
import { Headline } from './Headline.tsx';
import { Bold } from './Bold.tsx';
import { Markers } from '../../text-formats/unicode-markers-format/markers.ts';
import { Fragment } from 'react/jsx-runtime';
import { Italic } from './Italic.tsx';

export const Render = ({ encodedText }: { encodedText: string }) => {
  const lines = splitPreservingSeparator(encodedText, ZWS);

  return lines.map((line, i) => {
    const marker = line.substring(0, MARKER_STRING_LENGTH);
    switch (marker) {
      case Markers.H1:
      case Markers.H2:
      case Markers.H3:
        const [headline, ...restOfLineWithoutMarkers] =
          splitPreservingSeparator(line, '\n');
        return (
          <Fragment key={i + line}>
            <Headline level={marker}>{headline}</Headline>
            {restOfLineWithoutMarkers.join('')}
          </Fragment>
        );
      case Markers.BOLD_START:
        // NOTE: We could check if lines[i+1] starts with a BOLD_END marker
        // but for now I opt for this simpler solution.
        // Because of the above: There must not be any other markers between Markers.BOLD_START and Markers.BOLD_END!
        return <Bold key={i + line}>{line}</Bold>;
      case Markers.BOLD_END:
        break;
      case Markers.ITALIC_START:
        return <Italic key={i + line}>{line}</Italic>;
      case Markers.ITALIC_END:
        break;
      default:
        // remove any broken markers
        // markers can be broken by erasing text via backspace key in the editor
        // first line always has no marker at the start
        if (i !== 0) {
          // detect broken marker
          if (line.length < MARKER_STRING_LENGTH) {
            return '';
          }
        }
        break;
    }

    return <Text key={i + line}>{line}</Text>;
  });
};

/**
 * Splits a string by the specified separator but preserves the separator
 * in the resulting array.
 *
 * @param str - The string to split
 * @param separator - The separator to split by (string or RegExp)
 * @returns An array of strings split by the separator with special handling
 */
function splitPreservingSeparator(str: string, separator: string): string[] {
  return str.split(separator).map((s, i) => {
    if (i === 0) {
      return s;
    } else {
      return separator + s;
    }
  });
}
