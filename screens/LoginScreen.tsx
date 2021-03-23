import * as React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  StatusBar,
} from 'react-native';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>This button doesn't do anything yet</Text>
      <Button title="Log in" onPress={() => {}} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
