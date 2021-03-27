import { Message } from "../../types";

export const setMessageHistory = (channelName: string, messages: Message[]) => {
  return {
    type: "HIST_SET_MESSAGES",
    payload: { channelName, messages },
  };
};

export const addMessageToHistory = (channelName: string, message: Message) => {
  return {
    type: "HIST_NEW_MESSAGE",
    payload: { channelName, message },
  };
};
