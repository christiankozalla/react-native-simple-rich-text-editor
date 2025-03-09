import type { PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';

export const Bold = ({ children }: PropsWithChildren) => {
  return <Text style={styles.bold}>{children}</Text>;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 700,
  },
});
