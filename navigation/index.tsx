import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, StatusBar } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import SplashScreen from '../screens/SplashScreen';
import { Login, RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import LoginNavigator from './LoginNavigator';

import { connect } from 'react-redux';
import CallScreen from '../screens/CallScreen';
import { CardStyleInterpolators } from '@react-navigation/stack';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export function Navigation({
  colorScheme,
  isLoggedIn,
}: {
  colorScheme: ColorSchemeName;
  isLoggedIn: boolean;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(props: { isLoggedIn: boolean }) {
  const isLoading: Boolean = false;
  const isSignedOut: Boolean = false;
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {props.isLoggedIn ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginNavigator}
          options={{
            animationTypeForReplace: isSignedOut ? 'pop' : 'push',
          }}
        />
      )}
      <Stack.Screen
        name="Call"
        component={CallScreen}
        options={{
          headerTitle: 'Call',
          gestureEnabled: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        // headerStyle: { marginTop: StatusBar.currentHeight },
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
function mapStateToProps(state: { updateLogin: Login }) {
  // console.log(state);
  return {
    isLoggedIn: state.updateLogin.loggedIn,
  };
}
export default connect(mapStateToProps)(Navigation);
