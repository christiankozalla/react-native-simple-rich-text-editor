import type { PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';

export const Bold = ({
  children,
  fontSize,
}: PropsWithChildren<{ fontSize?: number }>) => {
  return <Text style={[styles.bold, { fontSize }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 700,
  },
});
