import * as React from "react";
import { FlatList, StyleSheet, Image, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { View, Text } from "../components/Themed";
import {
  Message as MessageType,
  MessageList as MessageListType,
} from "../types";
import {
  isDateBeforeToday,
  formatDate,
  formatTime,
} from "../hooks/dateFormatting";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { API_ROOT_URL_LOCALTUNNEL } from "../constants/Api";

import axios from "axios";

import TwilioServiceSingleton from "../services/TwilioServiceSingleton";
import { Client } from "twilio-chat";
import { Channel } from "twilio-chat/lib/channel";
import { Message as TwilioMessage } from "twilio-chat/lib/message";

import { setMessageList, newMessage } from "../redux/actions/updateMessages";

function Message(props: { message: MessageType }) {
  const color = useColorScheme();
  const navigation = useNavigation();
  const navigateToMessage = () => {
    navigation.navigate("Message", {
      headerTitle: props.message.name,
      linkedin_url: props.message.linkedin_url,
    });
  };

  return (
    <View style={styles.messageContainer}>
      <TouchableHighlight
        underlayColor={Colors[color].touchableHighlight}
        onPress={navigateToMessage}
      >
        <View style={styles.message}>
          <Image
            style={styles.profileImage}
            source={{ uri: props.message.photo_url }}
            resizeMode="cover"
          />
          <View style={styles.messageTextContainer}>
            <View style={styles.messageHeading}>
              <Text style={{ fontWeight: "bold" }}>{props.message.name}</Text>
              <Text style={{ color: Colors[color].greyText }}>
                {isDateBeforeToday(props.message.lastMessageDate)
                  ? formatDate(props.message.lastMessageDate)
                  : formatTime(props.message.lastMessageDate)}
              </Text>
            </View>
            <Text style={{ color: Colors[color].greyText }} numberOfLines={2}>
              {props.message.lastMessage}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

interface MessageListProps {
  messages: MessageListType;
  setMessageList: any;
  newMessage: any;
}

function MessageList(props: MessageListProps) {
  /**
   * Retrieve a Twilio chat token from the backend
   * @param userId - unique identifier for Twilio user
   */
  const getToken = (userId: string) =>
    axios
      .get(`${API_ROOT_URL_LOCALTUNNEL}/token/${userId}`)
      .then((twilioUser) => {
        return twilioUser.data.jwt;
      });

  /**
   * Add event listeners for new message
   * @param client - Twilio chat client instance
   */
  const setChannelEventListeners = (client: Client) => {
    client.on("messageAdded", (message: TwilioMessage) => {
      props.newMessage(message.channel.friendlyName, message);
    });
    return client;
  };

  /**
   * Convert from Twilio channel object to object stored in redux
   * @param channels - Array of Twilio channels
   */
  const parseChannels = async (channels: Channel[]) => {
    // Get channel's last message body
    const getLastMessage = async (channel: Channel) => {
      const paginator = await channel.getMessages();
      if (paginator.items.length === 0) return null;
      else return paginator.items[paginator.items.length - 1].body;
    };

    return await Promise.all(
      channels.map(async (channel) => ({
        lastMessageDate: channel.lastMessage
          ? channel.lastMessage.dateCreated
          : new Date(),
        lastMessage: await getLastMessage(channel),
        // Dummy values
        // TODO: update these with actual profile info from linkedin
        name: channel.friendlyName,
        channelName: channel.friendlyName,
        photo_url:
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        linkedin_url: channel.friendlyName,
      }))
    );
  };

  /**
   * Retrieve channels joined by user and update state
   * @param client - Twilio chat client instance
   */
  const getSubscribedChannels = async (client: Client) => {
    client
      .getSubscribedChannels()
      .then((channelPaginator) => parseChannels(channelPaginator.items))
      .then((newChannels) => {
        props.setMessageList([...newChannels]);
      });
  };

  React.useEffect(() => {
    // TODO: Update redux to include email address (use email as userId)
    const email = "mixr.devs@gmail.com";
    getToken(email)
      .then((token) =>
        TwilioServiceSingleton.getInstance().getChatClient(token)
      )
      .then(() =>
        TwilioServiceSingleton.getInstance().addTokenListener(getToken, email)
      )
      .then(setChannelEventListeners)
      .then(getSubscribedChannels)
      .catch((err) => console.error(err.message));
  }, [props.setMessageList]);

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
  return {
    messages: state.updateMessages,
  };
}

const mapDispatchToProps = {
  setMessageList,
  newMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);

const styles = StyleSheet.create({
  messageContainer: {},
  message: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 20,
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  messageTextContainer: {
    flex: 1,
    alignContent: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  listView: {
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  separator: {
    height: 1,
  },
});
