import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { View, Text } from '../components/Themed';
import {
  Message as MessageType,
  MessageList as MessageListType,
} from '../types';

function Message(props: { message: MessageType }) {
  return (
    <View style={styles.message}>
      <Text>{props.message.name}</Text>
      <Text>{props.message.lastMessageDate.toString()}</Text>
      <Text>{props.message.lastMessage}</Text>
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
  message: {
    flex: 1,
    // backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10,
  },
  listView: {
    width: '100%',
  },
});
