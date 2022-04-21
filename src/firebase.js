import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCtrhKXhAq24NCIBZICq531h2fdsvs6vmU",
    authDomain: "messenger-962ce.firebaseapp.com",
    projectId: "messenger-962ce",
    storageBucket: "messenger-962ce.appspot.com",
    messagingSenderId: "844245588319",
    appId: "1:844245588319:web:f7f766a4a70fa07c74beea"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth
const provider=new GoogleAuthProvider();

export {auth,provider};
export default db;