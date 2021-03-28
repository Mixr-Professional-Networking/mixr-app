import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableHighlight,
  BackHandler,
} from 'react-native';
import { View } from '../components/Themed';
import TabBarIcon from '../hooks/TabBarIcon';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CallScreen() {
  const navigation = useNavigation();
  const color = useColorScheme();

  const handleEndCallPress = () => {
    //do more here. Also go back when other user ends call
    navigation.goBack();
  };
  //Disables going back on Android (iOS handled in /navigation)
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <View style={styles.statusBar}>
      <View style={styles.imagesContainer}>
        <Image
          style={[styles.profileImage, { borderColor: Colors[color].text }]}
          source={{
            uri:
              'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
          }}
          resizeMode="cover"
        />
        <Image
          style={[styles.profileImage, { borderColor: Colors[color].text }]}
          source={{
            uri:
              'https://media-exp1.licdn.com/dms/image/C5603AQHrHiKhwEpumg/profile-displayphoto-shrink_400_400/0/1613274899664?e=1622073600&v=beta&t=jxVmfhz-aqLnZ2voG4XxHgNXo9qke4Lyp-JhFTsnjIQ',
          }}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity
        style={styles.endCallContainer}
        onPress={handleEndCallPress}
      >
        <TabBarIcon
          name="cancel"
          type="MaterialIcons"
          size={75}
          color="#ff3a30"
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  statusBar: {
    marginTop: StatusBar.currentHeight, //fixes status bar height on Android (SafeAreaView fixes for iOS)
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  endCallContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
