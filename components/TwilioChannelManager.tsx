import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import TwilioServiceSingleton from "../services/TwilioServiceSingleton";
import { Client } from "twilio-chat";
import { Channel } from "twilio-chat/lib/channel";
import { Message as TwilioMessage } from "twilio-chat/lib/message";

import { API_ROOT_URL_LOCALTUNNEL } from "../constants/Api";
import { setMessageList, newMessage } from "../redux/actions/updateMessages";

/**
 * Component encapsulating the logic for Twilio channel fetching and updating
 */
const TwilioChannelManager = (props: {
  setMessageList: any;
  newMessage: any;
}) => {
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

  useEffect(() => {
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
  }, [setMessageList]);

  // Empty component
  return <></>;
};

const mapDispatchToProps = {
  setMessageList,
  newMessage,
};

export default connect(null, mapDispatchToProps)(TwilioChannelManager);
