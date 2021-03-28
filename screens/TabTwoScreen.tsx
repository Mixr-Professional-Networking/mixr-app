import * as React from 'react';
import { StyleSheet } from 'react-native';

import MessageList from '../components/MessageList';
import { View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <MessageList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
