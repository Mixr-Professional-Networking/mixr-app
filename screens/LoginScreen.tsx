import { useLinkProps } from '@react-navigation/native';
import * as React from 'react';
import { Alert, StyleSheet, Image, Button, StatusBar, Platform } from 'react-native';
import Layout from '../constants/Layout'
import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions';
import useColorScheme from '../hooks/useColorScheme';
import { View, Text } from '../components/Themed';

import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';

// Auth0 Expo Code Example: https://github.com/expo/examples/tree/master/with-auth0

const auth0ClientId = "BwQHBhF9SiT4jJqDUPf2nubOfF5x40r7";
const authorizationEndpoint = "https://mixr.us.auth0.com/authorize";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function LoginScreen(props: any) {
  const colorScheme = useColorScheme();

  const [name, setName] = React.useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  React.useEffect(() => {
    if (result) {
      if (result.type == "error") {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded : any = jwtDecode(jwtToken);

        const { name } = decoded;
        setName(name);

        props.logIn();
      }
    }
  }, [result]);

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
          // promptAsync({ useProxy }) // Uncomment to enable Auth0 login flow
        }}
      />
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
