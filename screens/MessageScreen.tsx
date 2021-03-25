import * as React from 'react';
import { useLinkProps, useNavigation } from '@react-navigation/native';
import TextChat from '../components/TextChat';
import TabBarIcon from '../hooks/TabBarIcon';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { StyleSheet, TouchableOpacity } from 'react-native';

// import { useEffect } from 'react';

//url is the key as of now
function MessageScreen({
  route,
}: {
  route: {
    key: string;
    name: string;
    params: { headerTitle: string; linkedin_url: string };
  };
}) {
  const navigation = useNavigation();
  const color = useColorScheme();
  const navigateToCallScreen = () => {
    navigation.navigate('Call', {
      headerTitle: route.params.headerTitle,
    });
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: route.params.headerTitle,
      headerRight: () => (
        <HeaderButton
          onClick={navigateToCallScreen}
          name="phone"
          type="FontAwesome"
          color={Colors[color].text}
        />
      ),
    });
  });

  return <TextChat linkedin_url={route.params.linkedin_url} />;
}

export default MessageScreen;

function HeaderButton(props: {
  onClick: () => void;
  name: string;
  type: string;
  color: string;
}) {
  return (
    <TouchableOpacity onPress={props.onClick}>
      {/* @ts-ignore */}
      <TabBarIcon {...props} style={styles.headerIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    marginHorizontal: 15,
  },
});
