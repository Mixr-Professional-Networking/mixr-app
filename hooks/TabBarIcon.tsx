import * as React from 'react';
import { View } from '../components/Themed';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
export default function TabBarIcon(props: {
  name:
    | React.ComponentProps<typeof Ionicons>['name']
    | React.ComponentProps<typeof Feather>['name'];
  color: string;
  type: 'Ionicons' | 'Feather' | 'FontAwesome';
}) {
  if (props.type === 'Ionicons')
    // @ts-ignore errors below, ignore for now
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
  else if (props.type === 'Feather')
    // @ts-ignore
    return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
  else if (props.type === 'FontAwesome')
    // @ts-ignore
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
  else return <View />;
}
