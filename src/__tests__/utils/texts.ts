import { Markers } from '../../internal/text-formats/unicode-markers-format/markers';

export const markdownText1 = `
# Headline 1

A paragraph.

## Headline 2

Another paragraph.

### Headline 3

This is **bold text** and this is __italic__.

`;
export const internalText1 = `
${Markers.H1}Headline 1

A paragraph.

${Markers.H2}Headline 2

Another paragraph.

${Markers.H3}Headline 3

This is ${Markers.BOLD_START}bold text${Markers.BOLD_END} and this is ${Markers.ITALIC_START}italic${Markers.ITALIC_END}.

`;

export const internalText1WithRealMarkers = `
​󠄀︁󠇯Headline 1

A paragraph.

​󠄀︂󠇯Headline 2

Another paragraph.

​󠄀︃󠇯Headline 3

This is ${Markers.BOLD_START}bold text${Markers.BOLD_END} and this is ${Markers.ITALIC_START}italic${Markers.ITALIC_END}.

`;
