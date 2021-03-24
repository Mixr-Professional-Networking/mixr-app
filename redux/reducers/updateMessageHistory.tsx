//temporary state, will likely change
const initialState = {
  'https://www.linkedin.com/in/ethankeshishian/': {
    name: 'Ethan Keshishian',
    messages: [
      {
        date: new Date(),
        messageContent: "Hey, what's up?",
        sender: 'https://www.linkedin.com/in/ethankeshishian/',
      },
      {
        date: new Date(),
        messageContent: 'Nothing much',
        sender: 'https://www.linkedin.com/in/areksds/',
      },
    ],
    photo_url:
      'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
  },
  'https://www.linkedin.com/in/areksds/': {
    name: 'Arek Der-Sarkissian',
    lastMessageDate: new Date(),
    messages: [
      {
        date: new Date(),
        messageContent: "Hey, what's up?",
        sender: 'https://www.linkedin.com/in/ethankeshishian/',
      },
      {
        date: new Date(),
        messageContent: 'Nothing much',
        sender: 'https://www.linkedin.com/in/areksds/',
      },
    ],
    photo_url:
      'https://media-exp1.licdn.com/dms/image/C5603AQHrHiKhwEpumg/profile-displayphoto-shrink_400_400/0/1613274899664?e=1622073600&v=beta&t=jxVmfhz-aqLnZ2voG4XxHgNXo9qke4Lyp-JhFTsnjIQ',
  },
};

function updateMessageHistory(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export default updateMessageHistory;
