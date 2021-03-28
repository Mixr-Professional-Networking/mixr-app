import * as React from 'react';
import { View } from '../components/Themed';
import {
  Ionicons,
  Feather,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
export default function TabBarIcon(
  props: {
    color: string;
    size?: number;
  } & (
    | {
        name: React.ComponentProps<typeof Ionicons>['name'];
        type: 'Ionicons';
      }
    | {
        name: React.ComponentProps<typeof Feather>['name'];
        type: 'Feather';
      }
    | {
        name: React.ComponentProps<typeof FontAwesome>['name'];
        type: 'FontAwesome';
      }
    | {
        name: React.ComponentProps<typeof MaterialIcons>['name'];
        type: 'MaterialIcons';
      }
    | {
        name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
        type: 'MaterialCommunityIcons';
      }
  )
) {
  const size = props.size ? props.size : 30;
  if (props.type === 'Ionicons')
    return <Ionicons size={size} style={{ marginBottom: -3 }} {...props} />;
  else if (props.type === 'Feather')
    return <Feather size={size} style={{ marginBottom: -3 }} {...props} />;
  else if (props.type === 'FontAwesome')
    return <FontAwesome size={size} style={{ marginBottom: -3 }} {...props} />;
  else if (props.type === 'MaterialIcons')
    return (
      <MaterialIcons size={size} style={{ marginBottom: -3 }} {...props} />
    );
  else if (props.type === 'MaterialCommunityIcons')
    return (
      <MaterialCommunityIcons
        size={size}
        style={{ marginBottom: -3 }}
        {...props}
      />
    );
  else return <View />;
}
