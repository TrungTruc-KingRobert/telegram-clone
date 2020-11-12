import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCsi2eZxQvcGz95OESGeY_53fQInp5-cCQ",
  authDomain: "telegram-clone-82d5b.firebaseapp.com",
  databaseURL: "https://telegram-clone-82d5b.firebaseio.com",
  projectId: "telegram-clone-82d5b",
  storageBucket: "telegram-clone-82d5b.appspot.com",
  messagingSenderId: "757740359018",
  appId: "1:757740359018:web:19e235a716c285d18ba913"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;