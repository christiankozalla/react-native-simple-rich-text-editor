/**
 * Constants for rich text markers.
 */
const ZWS = '\u200B'; // Zero-width space used as the marker (both as prefix and base).
const MARKER_BYTE_LENGTH = 6; // Define a fixed marker length enables easy decoding when iterating over a string of the internal text format
const MARKER_STRING_LENGTH = MARKER_BYTE_LENGTH + 2; // like Markers.H1.length or Markers.BOLD.length
const HEADLINE_MARKER_TYPE = 0x10; // Marker type for headline start.
// PROBLEM: HEADLINE_LEVELS is used in two semantic ways. 1) for specifying the headline level in the encoded marker (see below) 2) and at the level interface (e.g. of Headline component) --> here we should use "H1" | "H2" | "H3" in an Enum or readonly object
const HEADLINE_LEVELS = {
  H1: 1,
  H2: 2,
  H3: 3,
} as const;
const HEADLINE_MARKERS: Record<keyof typeof HEADLINE_LEVELS, Uint8Array> = {
  H1: createMarker([HEADLINE_MARKER_TYPE, HEADLINE_LEVELS.H1]),
  H2: createMarker([HEADLINE_MARKER_TYPE, HEADLINE_LEVELS.H2]),
  H3: createMarker([HEADLINE_MARKER_TYPE, HEADLINE_LEVELS.H3]),
} as const;

const BOLD_MARKER_TYPE = 0x20;
const BOLD_MARKER_START = 1;
const BOLD_MARKER_END = 2;

const BOLD_MARKERS = {
  START: createMarker([BOLD_MARKER_TYPE, BOLD_MARKER_START]),
  END: createMarker([BOLD_MARKER_TYPE, BOLD_MARKER_END]),
} as const;

const ITALIC_MARKER_TYPE = 0x30;
const ITALIC_MARKER_START = 3;
const ITALIC_MARKER_END = 4;

const ITALIC_MARKERS = {
  START: createMarker([ITALIC_MARKER_TYPE, ITALIC_MARKER_START]),
  END: createMarker([ITALIC_MARKER_TYPE, ITALIC_MARKER_END]),
} as const;

const BULLET_POINT_MARKER_TYPE = 0x40;
const BULLET_POINT_UNORDERED = 1;
const BULLET_POINT_UL_MARKER = createMarker([
  BULLET_POINT_MARKER_TYPE,
  BULLET_POINT_UNORDERED,
]);
const BULLET_POINT_STRING_REPRESENTATION = '• ';

function createMarker(data: number[], length = MARKER_BYTE_LENGTH) {
  const array = new Uint8Array(length);
  array.set(data);
  return array;
}

export {
  ZWS,
  MARKER_STRING_LENGTH,
  MARKER_BYTE_LENGTH,
  HEADLINE_MARKER_TYPE,
  HEADLINE_LEVELS,
  HEADLINE_MARKERS,
  BOLD_MARKER_TYPE,
  BOLD_MARKERS,
  ITALIC_MARKERS,
  BULLET_POINT_UL_MARKER,
  BULLET_POINT_STRING_REPRESENTATION,
};
