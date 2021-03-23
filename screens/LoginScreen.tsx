import { useLinkProps } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Image, Button, StatusBar } from 'react-native';
import Layout from '../constants/Layout'
import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions';
import useColorScheme from '../hooks/useColorScheme';
import { View, Text } from '../components/Themed';

// import LinkedInModal from 'react-native-linkedin'

import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'mixr.us.auth0.com', clientId: 'BwQHBhF9SiT4jJqDUPf2nubOfF5x40r7' });

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
          // props.logIn();
          auth0
            .webAuth
            .authorize({scope: 'openid profile email'})
            .then(credentials =>
              // Successfully authenticated
              // Store the accessToken
              // this.setState({ accessToken: credentials.accessToken })
              console.log(credentials.accessToken)
            )
            .catch(error => console.log(error));
        }}
      />

      {/* <LinkedInModal
          clientID="86numytxpogb2d"
          clientSecret="ZJrn5GcgOU3esZ5q"
          redirectUri="https://dev.example.com/auth/linkedin/callback"
          containerStyle={styles.linkedInContainer}
          wrapperStyle={styles.linkedInWrapper}
          onSuccess={token => console.log(token)}
          renderButton={() => { return <Image style={styles.image} source={require('../assets/images/linkedin-login.png')} /> }}
        /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 5.5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkedInContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  linkedInWrapper: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 10,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  }
});

const mapDipatchToProps = {
  logIn,
  logOut,
};

export default connect(null, mapDipatchToProps)(LoginScreen);
