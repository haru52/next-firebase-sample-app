import { getApps } from 'firebase/app';
import {
  Auth,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from 'firebase/auth';

export default class FirebaseAuthAdapter {
  readonly #auth: Auth;

  constructor() {
    if (getApps().length === 0)
      throw new Error('FirebaseApp is not initialized');

    this.#auth = getAuth();
  }

  async login() {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(this.#auth, provider).catch((e) => {
      console.error(e);
      throw new Error('Login failed');
    });
  }

  async logout() {
    await signOut(this.#auth).catch((e) => {
      console.error(e);
      throw new Error('Logout failed');
    });
  }

  onAuthStateChanged(callback: NextOrObserver<User>) {
    return onAuthStateChanged(this.#auth, callback);
  }

  getCurrentUser() {
    return this.#auth.currentUser;
  }

  async deleteUser() {
    if (this.#auth.currentUser === null)
      throw new Error('Please login again before deleting the user account');
    await deleteUser(this.#auth.currentUser).catch(() => {
      throw new Error('Delete user failed');
    });
  }
}
