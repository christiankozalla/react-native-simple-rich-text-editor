import { encode } from './encode-decode.ts';
import { ZWS, HEADLINE_MARKERS } from './constants.ts';

export const Markers = {
  H1: encode(ZWS, HEADLINE_MARKERS.H1),
  H2: encode(ZWS, HEADLINE_MARKERS.H2),
  H3: encode(ZWS, HEADLINE_MARKERS.H3),
  BOLD: encode(ZWS, new Uint8Array()), // TODO
  ITALIC: encode(ZWS, new Uint8Array()), // TODO
  UL: encode(ZWS, new Uint8Array()), // TODO
} as const;
