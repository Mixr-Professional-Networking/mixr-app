export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  Call: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Match: undefined;
  Messages: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
  Message: undefined;
};

export type LoginParamList = {
  LoginScreen: undefined;
};

export type Message = {
  name: string;
  lastMessageDate: Date;
  lastMessage: string;
  photo_url: string;
  linkedin_url: string; //used for key in list, can be replaced with something else
};

export type MessageList = Message[];

export type MessageHistory = {
  [name: string]: {
    messages: {
      _id: number;
      text: string;
      createdAt: Date;
      user: User;
    }[];
  };
};

export type User = {
  _id: number;
  name: string;
  avatar: string;
};

export type Login = {
  loggedIn: boolean;
  linkedin: string;
  user: User;
};
