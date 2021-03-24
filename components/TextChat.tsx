import * as React from 'react';
import { connect } from 'react-redux';
import { MessageHistory as MessageHistoryType } from '../types';
import { Text } from '../components/Themed';

function TextChat(props: {
  messageHistory: MessageHistoryType;
  linkedin_url: string;
}) {
  return (
    <Text>{JSON.stringify(props.messageHistory[props.linkedin_url])}</Text>
  );
}

function mapStateToProps(state: { updateMessageHistory: MessageHistoryType }) {
  return {
    messageHistory: state.updateMessageHistory,
  };
}
export default connect(mapStateToProps)(TextChat);
