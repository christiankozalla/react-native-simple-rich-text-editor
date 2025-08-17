import type { PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';

export const Italic = ({
  children,
  fontSize,
}: PropsWithChildren<{ fontSize?: number }>) => {
  return <Text style={[styles.italic, { fontSize }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  italic: {
    fontStyle: 'italic',
  },
});
