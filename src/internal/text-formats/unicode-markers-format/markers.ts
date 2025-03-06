import { encode } from './encode-decode.ts';
import { ZWS, HEADLINE_MARKERS, BOLD_MARKERS } from './constants.ts';

export const Markers = {
  H1: encode(ZWS, HEADLINE_MARKERS.H1),
  H2: encode(ZWS, HEADLINE_MARKERS.H2),
  H3: encode(ZWS, HEADLINE_MARKERS.H3),
  BOLD_START: encode(ZWS, BOLD_MARKERS.START),
  BOLD_END: encode(ZWS, BOLD_MARKERS.END),
  ITALIC: encode(ZWS, new Uint8Array()), // TODO
  UL: encode(ZWS, new Uint8Array()), // TODO
} as const;
