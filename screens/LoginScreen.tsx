import { useLinkProps } from '@react-navigation/native';
import * as React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  StatusBar,
} from 'react-native';

import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions';

function LoginScreen(props: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>This button will log you in</Text>
      <Button
        title="Log in"
        onPress={() => {
          props.logIn();
        }}
      />
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

const mapDipatchToProps = {
  logIn,
  logOut,
};

export default connect(null, mapDipatchToProps)(LoginScreen);
