import type { PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';

export const Italic = ({ children }: PropsWithChildren) => {
  return <Text style={styles.italic}>{children}</Text>;
};

const styles = StyleSheet.create({
  italic: {
    fontStyle: 'italic',
  },
});
