import * as React from 'react';
import { StyleSheet, Button, StatusBar } from 'react-native';

import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions';
import useColorScheme from '../hooks/useColorScheme';
import { View, Text } from '../components/Themed';

function LoginScreen(props: any) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
      />
      <Text style={styles.title}>This button will log you in</Text>
      <Button
        title="Log in"
        onPress={() => {
          props.logIn();
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapDipatchToProps = {
  logIn,
  logOut,
};

export default connect(null, mapDipatchToProps)(LoginScreen);
