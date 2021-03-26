import * as React from 'react';
import { connect } from 'react-redux';
import { Login, MessageHistory as MessageHistoryType, User } from '../types';
import { GiftedChat } from 'react-native-gifted-chat';

function TextChat(props: {
  messageHistory: MessageHistoryType;
  linkedin_url: string;
  user: User;
}) {
  return (
    // <Text>{JSON.stringify(props.messageHistory[props.linkedin_url])}</Text>
    <GiftedChat
      messages={props.messageHistory[props.linkedin_url].messages}
      user={props.user}
    />
  );
}

function mapStateToProps(state: {
  updateMessageHistory: MessageHistoryType;
  updateLogin: Login;
}) {
  return {
    messageHistory: state.updateMessageHistory,
    user: state.updateLogin.user,
  };
}
export default connect(mapStateToProps)(TextChat);
