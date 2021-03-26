//temporary state, will likely change
const initialState = [
  {
    name: 'Ethan Keshishian',
    lastMessageDate: new Date(),
    lastMessage: "Hey, what's up?",
    photo_url:
      'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
    linkedin_url: 'https://www.linkedin.com/in/ethankeshishian/',
  },
  {
    name: 'Arek Der-Sarkissian',
    lastMessageDate: new Date(),
    lastMessage:
      "This is an example of a longer message. It's supposed to take up multiple lines on the screen. Here's a third line on my iPhone",
    photo_url:
      'https://media-exp1.licdn.com/dms/image/C5603AQHrHiKhwEpumg/profile-displayphoto-shrink_400_400/0/1613274899664?e=1622073600&v=beta&t=jxVmfhz-aqLnZ2voG4XxHgNXo9qke4Lyp-JhFTsnjIQ',
    linkedin_url: 'https://www.linkedin.com/in/areksds/',
  },
];

function messagesReducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export default messagesReducer;
