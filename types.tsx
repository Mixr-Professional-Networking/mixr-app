export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type LoginParamList = {
  LoginScreen: undefined;
};

export type Message = {
  name: string;
  lastMessageDate: Date;
  lastMessage: string;
  photo_url: string;
};

export type MessageList = Message[];
