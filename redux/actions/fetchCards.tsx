import firebase from "firebase"
import "../../constants/Firebase";

export function fetchCards() {
    console.log("FetchCards")
    return async (dispatch: any) => {
        console.log("Called")
        // Getting all linkedin profiles! (Async call in thunk)
        const db = firebase.firestore();
        const profiles_col = db.collection("profiles");

        const snapshot = await profiles_col.get();
        const profiles = snapshot.docs.map(x => x.data());
        console.log("profiles")

        dispatch({
            type: 'update',
            payload: profiles
        })
    }
} 