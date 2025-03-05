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
  const before = text.substring(0, selection.start);
  const after = text.substring(selection.end);

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

export { addHeadlineMarker };
