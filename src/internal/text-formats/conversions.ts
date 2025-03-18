import {
  ZWS,
  HEADLINE_LEVELS,
  HEADLINE_MARKER_TYPE,
  MARKER_STRING_LENGTH,
  BOLD_MARKER_TYPE,
  ITALIC_MARKER_TYPE,
} from './unicode-markers-format/constants.ts';
import { decode } from './unicode-markers-format/encode-decode.ts';

const Markdown = {
  H1: '# ',
  H2: '## ',
  H3: '### ',
  BOLD: '**',
  ITALIC: '__',
} as const;

type MarkdownString = string;

/**
 * convertInternalFormatToMarkdown converts text from the internal format to Markdown
 * @param internalText rich text in the internal format
 * @returns markdown formatted text
 */
const convertInternalFormatToMarkdown = (
  internalText: string
): MarkdownString => {
  // // 1. find all markers
  // // 2. translate the markers into corresponding Markdown markers
  // // 3. Replace internal markers with Markdown markers
  let markdownText = '';

  let i = 0;
  while (i < internalText.length) {
    const char = internalText[i];

    if (char === ZWS) {
      markdownText += decodedTokenToMarkdownToken(
        decode(internalText.substring(i, i + MARKER_STRING_LENGTH))
      );
      /**
       * Funny: when we use ${Markers.H1}Headline 1 in ./src/__tests__/utils/texts.ts to declare the test input text in the internal format,
       * then we need to use MARKER_STRING_LENGTH to iterate to the next character.
       * When we use a text like in `internalText1WithRealMarkers` variable, that has been produced by a function and copy-n-pasted,
       * then need to use MARKER_BYTE_LENGTH..
       */
      i += MARKER_STRING_LENGTH;
    } else {
      markdownText += char;
      i++;
    }
  }

  return markdownText;
};

const decodedTokenToMarkdownToken = (
  internalToken: number[]
): MarkdownString => {
  // the first byte declares the token type
  switch (internalToken[0]) {
    case HEADLINE_MARKER_TYPE:
      return Markdown[
        `H${internalToken[1] as (typeof HEADLINE_LEVELS)[keyof typeof HEADLINE_LEVELS]}`
      ];
    case BOLD_MARKER_TYPE:
      // no need to check whether it is a start marker or end marker, because they are the same in markdown
      return Markdown.BOLD;
    case ITALIC_MARKER_TYPE:
      return Markdown.ITALIC;
    default:
      return '';
  }
};

export { convertInternalFormatToMarkdown };
