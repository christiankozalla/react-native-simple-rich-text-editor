import { type PropsWithChildren, Fragment } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BULLET_POINT_STRING_REPRESENTATION } from '../../text-formats/unicode-markers-format/constants';

export const BulletPoint = ({
  children,
  fontSize,
}: PropsWithChildren<{ fontSize?: number }>) => {
  return (
    <Fragment>
      <Text style={[styles.bullet, { fontSize }]}>
        {BULLET_POINT_STRING_REPRESENTATION}
      </Text>
      <Text>{children}</Text>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  bullet: {
    marginRight: 8,
    fontSize: 16,
  },
});
