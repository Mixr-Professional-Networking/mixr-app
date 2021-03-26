const initialState = {
  loggedIn: false,
  linkedin: 'https://linkedin.com/in/ethankeshishian',
  user: {
    _id: 1,
    name: 'Ethan Keshishian',
    avatar:
      'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
  },
};

function updateLogin(state = initialState, action: any) {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, loggedIn: true };
    case 'LOG_OUT':
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}

export default updateLogin;
