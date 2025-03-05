import { type PropsWithChildren } from 'react';
import { type TextStyle, Text, StyleSheet } from 'react-native';
import { HEADLINE_LEVELS } from '../../text-formats/unicode-markers-format/constants.ts';

export const Headline = ({
  level,
  children,
}: PropsWithChildren<{
  level: (typeof HEADLINE_LEVELS)[keyof typeof HEADLINE_LEVELS];
}>) => {
  return (
    <Text style={(styles[level] as TextStyle) ?? styles[3]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
});
