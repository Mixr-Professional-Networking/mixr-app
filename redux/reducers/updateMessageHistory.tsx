//temporary state, will likely change
const initialState = {
  'https://www.linkedin.com/in/ethankeshishian/': {
    messages: [
      {
        _id: 2,
        text: 'Nothing much',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Arek Der-Sarkissian',
          avatar:
            'https://media-exp1.licdn.com/dms/image/C5603AQHrHiKhwEpumg/profile-displayphoto-shrink_400_400/0/1613274899664?e=1622073600&v=beta&t=jxVmfhz-aqLnZ2voG4XxHgNXo9qke4Lyp-JhFTsnjIQ',
        },
      },
      {
        _id: 1,
        text: "Hey, what's up?",
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        user: {
          _id: 1,
          name: 'Ethan Keshishian',
          avatar:
            'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
        },
      },
    ],
  },
  'https://www.linkedin.com/in/areksds/': {
    messages: [
      {
        _id: 2,
        text: 'Nothing much',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Arek Der-Sarkissian',
          avatar:
            'https://media-exp1.licdn.com/dms/image/C5603AQHrHiKhwEpumg/profile-displayphoto-shrink_400_400/0/1613274899664?e=1622073600&v=beta&t=jxVmfhz-aqLnZ2voG4XxHgNXo9qke4Lyp-JhFTsnjIQ',
        },
      },
      {
        _id: 1,
        text: "Hey, what's up?",
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        user: {
          _id: 1,
          name: 'Ethan Keshishian',
          avatar:
            'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
        },
      },
    ],
  },
};

function updateMessageHistory(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export default updateMessageHistory;
