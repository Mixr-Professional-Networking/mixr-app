import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import TwilioServiceSingleton from "../services/TwilioServiceSingleton";
import { Client } from "twilio-chat";
import { Channel } from "twilio-chat/lib/channel";
import { Message as TwilioMessage } from "twilio-chat/lib/message";

import { API_ROOT_URL_LOCALTUNNEL } from "../constants/Api";
import { Message as MixrChannel } from "../types";
import { setMessageList, newMessage } from "../redux/actions/updateMessages";
import {
  setMessageHistory,
  addMessageToHistory,
} from "../redux/actions/updateMessageHistory";

// TODO: Update redux to include email address (use email as userId)
const email = "mixr.devs@gmail.com";

/**
 * Component encapsulating the logic for Twilio channel fetching and updating
 */
const TwilioChannelManager = (props: {
  setMessageList: any;
  newMessage: any;
  setMessageHistory: any;
  addMessageToHistory: any;
}) => {
  /**
   * Retrieve a Twilio chat token from the backend
   * @param userId - unique identifier for Twilio user
   */
  const getToken = (userId: string) =>
    axios
      .get(`${API_ROOT_URL_LOCALTUNNEL}/token/${userId}`, {
        headers: {
          "Bypass-Tunnel-Reminder": "bypass",
        },
      })
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
      props.addMessageToHistory(
        message.channel.friendlyName,
        parseMessage(message)
      );
    });
    return client;
  };

  /**
   * Convert from Twilio message to our own message format
   * @param message - Twilio message
   */
  const parseMessage = (message: TwilioMessage) => ({
    _id: message.sid,
    text: message.body,
    createdAt: message.dateCreated,
    user: {
      _id: message.author,
      // Do this properly when we have the linkedin name and avatar
      name: message.author,
      avatar:
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    },
  });

  /**
   * Convert from Twilio channel to our own channel format
   * Return both the channel and its messages
   * @param channel - Twilio channel
   */
  const parseChannel = async (channel: Channel) => {
    const newMessages = (await channel.getMessages()).items
      .map(parseMessage)
      .reverse();

    const newChannel = {
      lastMessageDate: channel.lastMessage
        ? channel.lastMessage.dateCreated ?? new Date()
        : new Date(),
      lastMessage: newMessages[0].text,
      // Dummy values
      // TODO: update these with actual profile info from linkedin
      name: channel.friendlyName,
      channelName: channel.friendlyName,
      photo_url:
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      linkedin_url: channel.friendlyName,
    };

    return { newChannel, newMessages };
  };

  /**
   * Retrieve channels joined by user and update state
   * @param client - Twilio chat client instance
   */
  const updateChannels = async (client: Client) => {
    client
      .getSubscribedChannels()
      .then(async (channelPaginator) => {
        const newChannels: MixrChannel[] = [];
        for (const channel of channelPaginator.items) {
          const { newChannel, newMessages } = await parseChannel(channel);
          newChannels.push(newChannel);

          // Update message history for this channel
          props.setMessageHistory(channel.friendlyName, newMessages);
        }
        return newChannels;
      })
      .then((newChannels) => {
        props.setMessageList(newChannels);
      });
  };

  useEffect(() => {
    getToken(email)
      .then((token) =>
        TwilioServiceSingleton.getInstance().getChatClient(token)
      )
      .then(() =>
        TwilioServiceSingleton.getInstance().addTokenListener(getToken, email)
      )
      .then(setChannelEventListeners)
      .then(updateChannels)
      .catch((err) => console.error(err.message));
  }, [setMessageList]);

  // Empty component
  return <></>;
};

const mapDispatchToProps = {
  setMessageList,
  newMessage,
  setMessageHistory,
  addMessageToHistory,
};

export default connect(null, mapDispatchToProps)(TwilioChannelManager);
