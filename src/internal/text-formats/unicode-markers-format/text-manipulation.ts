import { Markers } from './markers';

/**
 * Adds a bullet point marker to the text at the current cursor position.
 * If the cursor is not at the beginning of a line, a newline is added before the marker.
 * If the cursor is at the beginning of a line, the marker is added directly.
 */
const addBulletPointMarker = (
  text: string,
  selection: { start: number; end: number }
) => {
  if (!text) {
    return Markers.UL;
  }

  // Split text at the current selection.
  const { before, selected, after } = splitBySelection(text, selection);

  // Ensure that the marker begins on a new line.
  let prefix = '';
  if (before.length > 0 && !before.endsWith('\n')) {
    prefix = '\n';
  }

  // Append the marker
  const insertion = prefix + Markers.UL;
  return before + insertion + selected + after;
};

/**
 * Inserts a headline start marker into the text at the current cursor position.
 * The marker encodes two bytes:
 *   - Byte 0: marker type (0x10 for headline)
 *   - Byte 1: headline level (here: 1)
 *
 * The marker is inserted so that it starts on a new line.
 */
const addHeadlineMarker = (
  marker: string, // marker already contains the headline level encoded
  text: string,
  selection: { start: number; end: number }
) => {
  if (!text) {
    return marker;
  }
  // Split text at the current selection.
  const { before, after } = splitBySelection(text, selection);

  // Do not add multiple consecutive markers, ZWS is the basis of each marker
  // if (before.endsWith(ZWS) || after.startsWith(ZWS)) {
  //   return before + after;
  // }

  // Ensure that the marker begins on a new line.
  let prefix = '';
  if (!before.endsWith('\n')) {
    prefix = '\n';
  }
  // Append the marker followed by a newline so that following text starts on a new line.
  const insertion = prefix + marker;
  return before + insertion + after;
};

const FontStyleMarkers: Record<
  'bold' | 'italic',
  { START: string; END: string }
> = {
  bold: {
    START: Markers.BOLD_START,
    END: Markers.BOLD_END,
  },
  italic: { START: Markers.ITALIC_START, END: Markers.ITALIC_END },
};

const addFontStyleEndMarker = (
  text: string,
  selection: { start: number; end: number },
  style: 'bold' | 'italic'
) => {
  const { before, selected, after } = splitBySelection(text, selection);
  return {
    text: before + selected + FontStyleMarkers[style].END + after,
    selection,
  };
};

const addFontStyleMarkers = (
  text: string,
  selection: { start: number; end: number },
  style: 'bold' | 'italic'
) => {
  const { before, selected, after } = splitBySelection(text, selection);

  // effectively no selection
  if (selection.end - selection.start === 0) {
    let prefix = '';
    if (!before.endsWith('\n') && !before.endsWith(' ')) {
      prefix += ' ';
    }

    return {
      text: before + prefix + FontStyleMarkers[style].START,
      selection,
    };
  }

  return {
    text:
      before +
      FontStyleMarkers[style].START +
      selected +
      FontStyleMarkers[style].END +
      after,
    selection,
  };
};

function splitBySelection(
  text: string,
  selection: { start: number; end: number }
): { before: string; selected: string; after: string } {
  return {
    before: text.substring(0, selection.start),
    selected: text.substring(selection.start, selection.end),
    after: text.substring(selection.end),
  };
}

export {
  addBulletPointMarker,
  addHeadlineMarker,
  addFontStyleMarkers,
  addFontStyleEndMarker,
  splitBySelection,
};
