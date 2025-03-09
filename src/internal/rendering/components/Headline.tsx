import { type PropsWithChildren } from 'react';
import { type TextStyle, Text, StyleSheet } from 'react-native';
import { Markers } from '../../text-formats/unicode-markers-format/markers.ts';

export const Headline = ({
  level,
  children,
}: PropsWithChildren<{
  level: keyof typeof styles;
}>) => {
  return (
    <Text style={(styles[level] as TextStyle) ?? styles[3]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  [Markers.H1]: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  [Markers.H2]: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  [Markers.H3]: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
});
