import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import TextChat from '../components/TextChat';
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

  React.useEffect(() => {
    navigation.setOptions({ title: route.params.headerTitle });
  });

  return <TextChat linkedin_url={route.params.linkedin_url} />;
}

export default MessageScreen;
