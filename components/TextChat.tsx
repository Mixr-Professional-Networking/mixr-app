import * as React from "react";
import { connect } from "react-redux";
import { Login, MessageHistory as MessageHistoryType, User } from "../types";
import { GiftedChat } from "react-native-gifted-chat";
import TwilioServiceSingleton from "../services/TwilioServiceSingleton";
import { Channel } from "twilio-chat/lib/channel";

function TextChat(props: {
  messageHistory: MessageHistoryType;
  channelName: string;
  user: User;
}) {
  // console.log(props.messageHistory[props.channelName])
  let chatClientChannel = {} as Channel;

  const updateChannel = async () => {
    const channel = await (
      await TwilioServiceSingleton.getInstance().getChatClient()
    )?.getChannelByUniqueName(props.channelName);
    if (channel !== undefined) chatClientChannel = channel;
  };

  React.useEffect(() => {
    updateChannel();
  }, [props.channelName]);

  return (
    // <Text>{JSON.stringify(props.messageHistory[props.linkedin_url])}</Text>
    <GiftedChat
      messages={props.messageHistory[props.channelName].messages}
      user={props.user}
      onSend={async (messages) => {
        messages.forEach((message) => {
          chatClientChannel.sendMessage(message.text);
        });
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
