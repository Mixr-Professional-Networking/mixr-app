//temporary state, will likely change
const initialState = [
  {
    name: "Ethan Keshishian",
    channelName: "dummy_name",
    lastMessageDate: new Date(),
    lastMessage: "Hey, what's up?",
    photo_url:
      "https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw",
    linkedin_url: "https://www.linkedin.com/in/ethankeshishian/",
  },
  {
    name: "Arek Der-Sarkissian",
    channelName: "dummy_name2",
    lastMessageDate: new Date(),
    lastMessage:
      "This is an example of a longer message. It's supposed to take up multiple lines on the screen. Here's a third line on my iPhone",
    photo_url:
      "https://media-exp1.licdn.com/dms/image/C5603AQHrHiKhwEpumg/profile-displayphoto-shrink_400_400/0/1613274899664?e=1622073600&v=beta&t=jxVmfhz-aqLnZ2voG4XxHgNXo9qke4Lyp-JhFTsnjIQ",
    linkedin_url: "https://www.linkedin.com/in/areksds/",
  },
];

function updateMessages(state = initialState, action: any) {
  switch (action.type) {
    case "SET_MESSAGE_LIST":
      return action.payload;
    case "NEW_MESSAGE":
      // Update lastMessageDate and lastMessage for appropriate channel
      const idx = state.findIndex((item) => {
        return item.channelName === action.payload.channelName;
      });
      if (idx === -1) return state;
      const newState = [...state];
      newState[idx].lastMessage = action.payload.message.body;
      newState[idx].lastMessageDate = action.payload.message.dateCreated;
      return newState;
    default:
      return state;
  }
}

export default updateMessages;
