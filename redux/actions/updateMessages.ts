import { Message } from "../../types";

export const setMessageList = (messages: Message[]) => {
  return {
    type: "SET_MESSAGE_LIST",
    payload: messages,
  };
};

export const newMessage = (channelName: string, message: Message) => {
  return {
    type: "NEW_MESSAGE",
    payload: { channelName, message },
  };
};
