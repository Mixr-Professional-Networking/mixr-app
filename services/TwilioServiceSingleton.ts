import { Client } from "twilio-chat";

export default class TwilioServiceSingleton {
  static serviceInstance: TwilioServiceSingleton;
  static chatClient: Client | null;

  // create a single service instance
  static getInstance() {
    if (!TwilioServiceSingleton.serviceInstance) {
      TwilioServiceSingleton.serviceInstance = new TwilioServiceSingleton();
    }
    return TwilioServiceSingleton.serviceInstance;
  }

  // use chat client if don't have instance, create a new chat client
  async getChatClient(twilioToken?: string) {
    if (!TwilioServiceSingleton.chatClient && !twilioToken) {
      throw new Error("Twilio token is null or undefined");
    }
    if (!TwilioServiceSingleton.chatClient && twilioToken) {
      return Client.create(twilioToken).then((client) => {
        TwilioServiceSingleton.chatClient = client;
        return TwilioServiceSingleton.chatClient;
      });
    }
    return Promise.resolve().then(() => TwilioServiceSingleton.chatClient);
  }

  // manage our token expiration
  addTokenListener(
    getToken: (userId: string) => Promise<string>,
    userId: string
  ) {
    if (!TwilioServiceSingleton.chatClient) {
      throw new Error("Twilio client is null or undefined");
    }
    TwilioServiceSingleton.chatClient.on("tokenAboutToExpire", () => {
      getToken(userId).then(TwilioServiceSingleton.chatClient!.updateToken);
    });

    TwilioServiceSingleton.chatClient.on("tokenExpired", () => {
      getToken(userId).then(TwilioServiceSingleton.chatClient!.updateToken);
    });
    return TwilioServiceSingleton.chatClient;
  }

  // gracefully shutting down library instance.
  clientShutdown() {
    TwilioServiceSingleton.chatClient?.shutdown();
    TwilioServiceSingleton.chatClient = null;
  }
}
