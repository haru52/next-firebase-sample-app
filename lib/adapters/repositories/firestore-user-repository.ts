import { FirebaseApp } from 'firebase/app';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import User from '@/lib/entities/user';
import UserRepository from '@/lib/usecases/user-repository';

export default class FirestoreUserRepository implements UserRepository {
  readonly #db: Firestore;
  static #usersPath = 'users';

  constructor(app: FirebaseApp) {
    this.#db = getFirestore(app);
  }

  async save(user: User) {
    const { email, name } = user;
    const now = new Date();
    await setDoc(doc(this.#db, FirestoreUserRepository.#usersPath, user.id), {
      email,
      name,
      createdAt: now,
      updatedAt: now,
    });
    return new User(user.id, email, name, now, now);
  }

  async findOne(id: string) {
    const docData = (
      await getDoc(doc(this.#db, FirestoreUserRepository.#usersPath, id))
    ).data();
    return docData === undefined
      ? null
      : new User(
          id,
          docData.email,
          docData.name,
          docData.createdAt.toDate(),
          docData.updatedAt.toDate()
        );
  }

  async findAll() {
    const querySnapshot = await getDocs(
      collection(this.#db, FirestoreUserRepository.#usersPath)
    );
    return querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return new User(
        doc.id,
        docData.email,
        docData.name,
        docData.createdAt.toDate(),
        docData.updatedAt.toDate()
      );
    });
  }

  async delete(id: string) {
    await deleteDoc(doc(this.#db, FirestoreUserRepository.#usersPath, id));
  }
}
