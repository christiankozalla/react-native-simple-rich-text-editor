import { Text, StyleSheet } from 'react-native';

export const Bold = (text: string) => {
  return <Text style={styles.bold}>{text}</Text>;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 700,
  },
});
