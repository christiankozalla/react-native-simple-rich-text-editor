import { internalText1, markdownText1 } from './utils/texts.ts';
import { convertInternalFormatToMarkdown } from '../internal/text-formats/conversions.ts';

it('Converts internal text representation to Markdown', () => {
  const convertedToMarkdown = convertInternalFormatToMarkdown(internalText1);

  expect(convertedToMarkdown).toBe(markdownText1);
});
