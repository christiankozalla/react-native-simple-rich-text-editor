import {
  HEADLINE_LEVELS,
  HEADLINE_MARKER_TYPE,
  ZWS,
  MARKER_STRING_LENGTH,
} from './unicode-markers-format/constants.ts';
import { decode } from './unicode-markers-format/encode-decode.ts';

const Markdown = {
  H1: '# ',
  H2: '## ',
  H3: '### ',
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
    default:
      return '';
  }
};

export { convertInternalFormatToMarkdown };
