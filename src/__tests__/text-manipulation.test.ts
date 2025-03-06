import { Markers } from '../internal/text-formats/unicode-markers-format/markers';
import {
  addBoldMarkers,
  splitBySelection,
} from '../internal/text-formats/unicode-markers-format/text-manipulation';

it('inserts BOLD START and BOLD END markers for selection', () => {
  const inputText = 'Das ist das 13te Zeichen. Ende ist am 43ten Zeichen';
  const selection = { start: 12, end: 43 };
  const expectedText = `Das ist das ${Markers.BOLD_START}13te Zeichen. Ende ist am 43ten${Markers.BOLD_END} Zeichen`;

  const withBoldMarkers = addBoldMarkers(inputText, selection);

  expect(withBoldMarkers).toBe(expectedText);
});

describe('splitBySelection', () => {
  it('No selected text - concatenated returned strings are equal to input', () => {
    const inputText = `Das ist das 13te Zeichen. Ende ist am 43ten Zeichen`;
    const emptySelection = { start: 5, end: 5 };
    const { before, selected, after } = splitBySelection(
      inputText,
      emptySelection
    );

    expect(before + selected + after).toBe(inputText);
  });

  it('No selected text - selected prop is empty string', () => {
    const inputText = `Das ist das 13te Zeichen. Ende ist am 43ten Zeichen`;
    const emptySelection = { start: 5, end: 5 };
    const { selected } = splitBySelection(inputText, emptySelection);

    expect(selected).toBe('');
  });

  it('with selection - before, selected, after substrings', () => {
    const { before, selected, after } = splitBySelection('Das ist ein Test', {
      start: 4,
      end: 11,
    });

    expect(before).toBe('Das ');
    expect(selected).toBe('ist ein');
    expect(after).toBe(' Test');
  });
});
