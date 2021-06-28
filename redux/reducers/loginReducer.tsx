const initialState = {
  loggedIn: false,
  linkedin: null, // vanity name
  user: {
    _id: 1,
    name: null,
    avatar:
      'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
  },
};

function loginReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        linkedin: action.payload.vanity,
        user: {
          _id: action.payload.vanity,
          name: action.payload.data.userProfile.fullName,
          avatar: action.payload.data.userProfile.photo,
        },
        fullProfile: action.payload.data,
        loggedIn: true,
        login_err: null,
      };
    case 'LOG_IN_FAILED':
      return { ...state, login_err: action.payload };
    case 'LOG_OUT':
      return { ...state, loggedIn: false };
    case 'LOG_IN_BYPASS':
      return { ...state, loggedIn: true };
    default:
      return state;
  }
}

export default loginReducer;
