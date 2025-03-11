import { encode } from './encode-decode.ts';
import {
  ZWS,
  HEADLINE_MARKERS,
  BOLD_MARKERS,
  ITALIC_MARKERS,
  BULLET_POINT_UL_MARKER,
} from './constants.ts';

export const Markers = {
  H1: encode(ZWS, HEADLINE_MARKERS.H1),
  H2: encode(ZWS, HEADLINE_MARKERS.H2),
  H3: encode(ZWS, HEADLINE_MARKERS.H3),
  BOLD_START: encode(ZWS, BOLD_MARKERS.START),
  BOLD_END: encode(ZWS, BOLD_MARKERS.END),
  ITALIC_START: encode(ZWS, ITALIC_MARKERS.START),
  ITALIC_END: encode(ZWS, ITALIC_MARKERS.END),
  UL: encode(ZWS, BULLET_POINT_UL_MARKER),
} as const;
