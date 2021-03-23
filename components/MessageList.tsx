import * as React from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { View, Text } from '../components/Themed';
import {
  Message as MessageType,
  MessageList as MessageListType,
} from '../types';

function Message(props: { message: MessageType }) {
  return (
    <View style={styles.messageContainer}>
      <Image
        style={styles.profileImage}
        source={{ uri: props.message.photo_url }}
        resizeMode="cover"
      />
      <View style={styles.messageText}>
        <Text style={{ fontWeight: 'bold' }}>{props.message.name}</Text>
        <Text>{props.message.lastMessageDate.toString()}</Text>
        <Text>{props.message.lastMessage}</Text>
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
        keyExtractor={(message) => message.name}
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
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10,
  },
  messageText: {
    flex: 1,
  },
  listView: {
    width: '100%',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
});
