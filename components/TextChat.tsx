import * as React from 'react';
import { connect } from 'react-redux';
import { MessageHistory as MessageHistoryType } from '../types';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text } from '../components/Themed';

function TextChat(props: {
  messageHistory: MessageHistoryType;
  linkedin_url: string;
}) {
  return (
    // <Text>{JSON.stringify(props.messageHistory[props.linkedin_url])}</Text>
    <GiftedChat
      messages={props.messageHistory[props.linkedin_url].messages}
      user={{
        _id: 1,
        name: 'Ethan Keshishian',
        avatar:
          'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
      }}
    />
  );
}

function mapStateToProps(state: { updateMessageHistory: MessageHistoryType }) {
  return {
    messageHistory: state.updateMessageHistory,
  };
}
export default connect(mapStateToProps)(TextChat);
