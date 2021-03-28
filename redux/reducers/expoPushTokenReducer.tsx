const initialState = '';

function expoPushTokenReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'EXPO_PUSH':
      return action.data;
    default:
      return state;
  }
}

export default expoPushTokenReducer;
