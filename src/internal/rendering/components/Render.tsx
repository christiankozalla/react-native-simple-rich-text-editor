import { Text } from 'react-native';
import { intersperse } from '../utils';
import { decode } from '../../text-formats/unicode-markers-format';
import {
  ZWS,
  HEADLINE_MARKER_TYPE,
} from '../../text-formats/unicode-markers-format';
import { Headline } from './Headline';

/**
 * Renders the encoded text by splitting it on newlines.
 * If a line begins with ZWS, it decodes the marker from the line
 * and, if it is a headline marker, renders that line with headline styling.
 */
export const Render = ({ encodedText }: { encodedText: string }) => {
  const lines = encodedText.split('\n');

  return intersperse(
    lines.map((line, i) => {
      if (line.startsWith(ZWS)) {
        // Decode the entire line (marker + text).
        const decodedBytes = decode(line);

        if (
          decodedBytes.length >= 2 &&
          decodedBytes[0] === HEADLINE_MARKER_TYPE
        ) {
          return (
            <Headline key={i + line} level={decodedBytes[1]!}>
              {line}
            </Headline>
          );
        }
      }
      // Render normal text.
      return <Text key={i + line}>{line}</Text>;
    }),
    '\n'
  );
};
