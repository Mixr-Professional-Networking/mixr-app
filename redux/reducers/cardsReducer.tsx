const initialState = [
  {
    name: 'Ethan Keshishian',
    picture:
      'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
    experience: [{ title: 'Developer at LA Hacks 2021', date: 'March 2021' }],
    education: [
      {
        name: 'UCLA',
        date: '2019-2023',
        major: 'Bachelor of Science - Computer Science',
      },
    ],
  },
];

function cardsReducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export default cardsReducer;
