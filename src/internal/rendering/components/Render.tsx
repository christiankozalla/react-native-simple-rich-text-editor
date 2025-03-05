import { Text } from 'react-native';
import { intersperse } from '../utils.ts';
import { decode } from '../../text-formats/unicode-markers-format/encode-decode.ts';
import {
  ZWS,
  HEADLINE_LEVELS,
  HEADLINE_MARKER_TYPE,
  MARKER_STRING_LENGTH,
} from '../../text-formats/unicode-markers-format/constants.ts';
import { Headline } from './Headline.tsx';

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
        const decodedBytes = decode(line.substring(0, MARKER_STRING_LENGTH));

        if (
          decodedBytes.length >= 2 &&
          decodedBytes[0] === HEADLINE_MARKER_TYPE
        ) {
          return (
            <Headline
              key={i + line}
              level={
                decodedBytes[1] as (typeof HEADLINE_LEVELS)[keyof typeof HEADLINE_LEVELS]
              }
            >
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
