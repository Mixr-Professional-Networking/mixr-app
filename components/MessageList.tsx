import * as React from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { View, Text } from '../components/Themed';
import {
  Message as MessageType,
  MessageList as MessageListType,
} from '../types';
import {
  isDateBeforeToday,
  formatDate,
  formatTime,
} from '../hooks/dateFormatting';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

//todo: fix light mode color, implement 2 lines of text max
function Message(props: { message: MessageType }) {
  const color = useColorScheme();
  return (
    <View style={styles.messageContainer}>
      <Image
        style={styles.profileImage}
        source={{ uri: props.message.photo_url }}
        resizeMode="cover"
      />
      <View style={styles.messageTextContainer}>
        <View style={styles.messageHeading}>
          <Text style={{ fontWeight: 'bold' }}>{props.message.name}</Text>
          <Text>
            {isDateBeforeToday(props.message.lastMessageDate)
              ? formatDate(props.message.lastMessageDate)
              : formatTime(props.message.lastMessageDate)}
          </Text>
        </View>
        <Text style={{ color: Colors[color].tabIconDefault }}>
          {props.message.lastMessage}
        </Text>
      </View>
    </View>
  );
}

function MessageList(props: { messages: MessageListType }) {
  const renderItem = ({ item }: { item: MessageType }) => {
    return <Message message={item} />;
  };
  return (
    <View style={styles.listView}>
      <FlatList
        data={props.messages}
        renderItem={renderItem}
        keyExtractor={(message) => message.linkedin_url}
        // might need to include selectedId
      />
    </View>
  );
}

function mapStateToProps(state: { updateMessages: MessageListType }) {
  // console.log(state);
  return {
    messages: state.updateMessages,
  };
}
export default connect(mapStateToProps)(MessageList);

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 20,
  },
  messageTextContainer: {
    flex: 1,
  },
  listView: {
    width: '100%',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
