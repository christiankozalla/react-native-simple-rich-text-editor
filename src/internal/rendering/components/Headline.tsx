import { type PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Markers } from '../../text-formats/unicode-markers-format/markers.ts';

export const Headline = ({
  level,
  fontSize = 14,
  children,
}: PropsWithChildren<{
  level: keyof typeof styles;
  fontSize?: number;
}>) => {
  return (
    <Text
      style={[
        styles[level] ?? styles[3],
        { fontSize: (styles[level]?.fontSize ?? 18) * (fontSize / 14) },
      ]}
    >
      {children}
    </Text>
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
