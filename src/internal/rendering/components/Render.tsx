import { Text } from 'react-native';
import {
  ZWS,
  MARKER_STRING_LENGTH,
  BULLET_POINT_STRING_REPRESENTATION,
} from '../../text-formats/unicode-markers-format/constants.ts';
import { Headline } from './Headline.tsx';
import { Bold } from './Bold.tsx';
import { Markers } from '../../text-formats/unicode-markers-format/markers.ts';
import { Fragment } from 'react/jsx-runtime';
import { Italic } from './Italic.tsx';
import { BulletPoint } from './BulletPoint.tsx';
import { intersperse } from '../utils.ts';

const bulletPointRegex = new RegExp(
  BULLET_POINT_STRING_REPRESENTATION.trimEnd() + ' ?',
  'g'
); // matches the bullet point alone or the bullet point followed by a space

export const Render = ({
  encodedText,
  fontSize,
}: {
  encodedText: string;
  fontSize?: number;
}) => {
  const lines = splitPreservingSeparator(
    encodedText.replaceAll(bulletPointRegex, ''),
    ZWS
  ); // each BulletPoint.tsx instance adds a BULLET_POINT_STRING_REPRESENTATION, we need to remove them to avoid adding extra chars on each render

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
            <Headline level={marker} fontSize={fontSize}>
              {headline}
            </Headline>
            {restOfLineWithoutMarkers.join('')}
          </Fragment>
        );
      case Markers.UL:
        // NOTE: no other markers are allowed in a bullet point list for now..
        // if there are other markers they will lead to a break out of the the list -> will make the list terminate early
        const [bulletPoints, ...paragraphs] = splitPreservingSeparator(
          line,
          '\n\n'
        );

        return (
          <Fragment key={i + line}>
            {intersperse(
              // adds newlines after split() operation
              (bulletPoints ?? '')
                .split('\n') // erases newlines
                .map((bulletPointLine, j) => (
                  <BulletPoint key={j + bulletPointLine} fontSize={fontSize}>
                    {bulletPointLine}
                  </BulletPoint>
                )),
              '\n'
            )}
            {paragraphs.map((p) => (
              <Text key={p} style={{ fontSize }}>
                {p}
              </Text>
            ))}
          </Fragment>
        );
      case Markers.BOLD_START:
        // NOTE: We could check if lines[i+1] starts with a BOLD_END marker
        // but for now I opt for this simpler solution.
        // Because of the above: There must not be any other markers between Markers.BOLD_START and Markers.BOLD_END!
        return (
          <Bold key={i + line} fontSize={fontSize}>
            {line}
          </Bold>
        );
      case Markers.BOLD_END:
        break;
      case Markers.ITALIC_START:
        return (
          <Italic key={i + line} fontSize={fontSize}>
            {line}
          </Italic>
        );
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

    return (
      <Text key={i + line} style={{ fontSize }}>
        {line}
      </Text>
    );
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
