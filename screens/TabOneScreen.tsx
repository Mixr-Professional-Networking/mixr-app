import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { CardStack } from '../components';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <CardStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
