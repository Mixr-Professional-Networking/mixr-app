import * as React from 'react';
import { connect } from 'react-redux';
import { Login, MessageHistory as MessageHistoryType, User } from '../types';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import Colors from '../constants/Colors';

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
      renderBubble={(props: any) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: Colors['light'].touchableHighlight,
              },
            }}
          />
        );
      }}
    />
  );
}

function mapStateToProps(state: {
  messageHistory: MessageHistoryType;
  login: Login;
}) {
  return {
    messageHistory: state.messageHistory,
    user: state.login.user,
  };
}
export default connect(mapStateToProps)(TextChat);
