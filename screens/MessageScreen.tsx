import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import TextChat from '../components/TextChat';

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
  navigation.setOptions({ headerTitle: route.params.headerTitle });
  return <TextChat linkedin_url={route.params.linkedin_url} />;
}

export default MessageScreen;
