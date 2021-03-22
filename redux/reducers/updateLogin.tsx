const initialState = { loggedIn: false };

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
