//temporary state, will likely change
const initialState = [
  {
    name: 'Ethan Keshishian',
    lastMessageDate: new Date(),
    lastMessage: "Hey, what's up?",
  },
  {
    name: 'Arek Der-Sarkissian',
    lastMessageDate: new Date(),
    lastMessage: "Hey, what's up?",
  },
];

function updateMessages(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export default updateMessages;
