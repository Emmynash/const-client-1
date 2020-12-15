import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FIREBASE_CONFIG } from './firebaseConfig'

const config = FIREBASE_CONFIG;

class firebase {
  db: app.database.Database 
  auth: app.auth.Auth;
  constructor(){
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

   // *** Auth API ***
  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // *** User API ***
  user = (uid: string) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default firebase ;