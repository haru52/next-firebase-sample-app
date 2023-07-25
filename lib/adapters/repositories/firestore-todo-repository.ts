import { FirebaseApp } from 'firebase/app';
import Todo from '@/lib/entities/todo';
import TodoRepository from '@/lib/usecases/todo-repository';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';

export default class FirestoreTodoRepository implements TodoRepository {
  readonly #db: Firestore;
  readonly #userDocRef;
  static #todosPath = 'todos';
  static #usersPath = 'users';

  constructor(app: FirebaseApp, userId: string) {
    this.#db = getFirestore(app);
    this.#userDocRef = doc(
      this.#db,
      FirestoreTodoRepository.#usersPath,
      userId
    );
  }

  async save(todo: Todo) {
    const now = new Date();
    const todoDocRef = await addDoc(
      collection(this.#userDocRef, FirestoreTodoRepository.#todosPath),
      {
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        created_at: now,
        updated_at: now,
      }
    );
    return new Todo(
      todo.userId,
      todo.title,
      todo.description,
      todo.completed,
      todoDocRef.id,
      now,
      now
    );
  }

  async findOne(id: string) {
    const docData = (
      await getDoc(
        doc(
          collection(this.#userDocRef, FirestoreTodoRepository.#todosPath),
          id
        )
      )
    ).data();
    return docData === undefined
      ? null
      : new Todo(
          docData.user.id,
          docData.title,
          docData.description,
          docData.completed,
          id,
          docData.created_at.toDate(),
          docData.updated_at.toDate()
        );
  }

  async findAll() {
    const querySnapshot = await getDocs(
      collection(this.#userDocRef, FirestoreTodoRepository.#todosPath)
    );
    return querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return new Todo(
        this.#userDocRef.id,
        docData.title,
        docData.description,
        docData.completed,
        doc.id,
        docData.created_at.toDate(),
        docData.updated_at.toDate()
      );
    });
  }

  async update(todo: Todo) {
    if (todo.id === undefined) throw new Error('todo.id is undefined');

    const updatedAt = new Date();
    await updateDoc(
      doc(this.#db, FirestoreTodoRepository.#todosPath, todo.id),
      {
        user: this.#userDocRef,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        updated_at: updatedAt,
      }
    );
    return new Todo(
      todo.userId,
      todo.title,
      todo.description,
      todo.completed,
      todo.id,
      todo.createdAt,
      updatedAt
    );
  }

  async delete(id: string) {
    await deleteDoc(
      doc(collection(this.#userDocRef, FirestoreTodoRepository.#todosPath), id)
    );
  }

  async deleteAll() {
    const querySnapshot = await getDocs(
      collection(this.#userDocRef, FirestoreTodoRepository.#todosPath)
    );
    const batch = writeBatch(this.#db);
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
}
