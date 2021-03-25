import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { View, Text } from '../components/Themed';

export default function CallScreen({
  route,
}: {
  route: {
    key: string;
    name: string;
    params: { headerTitle: string; linkedin_url: string };
  };
}) {
  const navigation = useNavigation(); //TODO: disable navigating back, implement backwards navigation when call ends
  React.useEffect(() => {
    // navigation.setOptions({
    //   // headerTitle: route.params.headerTitle,
    //   // headerStyle: { marginTop: 24 },
    // });
  });
  return (
    <SafeAreaView style={styles.statusBar}>
      <Text>this is the audio screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    marginTop: StatusBar.currentHeight, //fixes status bar height on Android (SafeAreaView fixes for iOS)
  },
});
