import { API_ROOT_URL } from "../../constants/Api"

export function logIn(url: string) {
  return (dispatch: any) => {
    fetch(`${API_ROOT_URL}/li/${url}`)
      .then(x => x.json())
      .then(
        data => {
          dispatch({ type: 'LOG_IN', payload: { vanity: url, data } });
        },
        err => { dispatch({ type: 'LOG_IN_FAILED', payload: err }); }
      );
  }
} 

export function logOut() {
  return {
    type: 'LOG_OUT',
  };
}
