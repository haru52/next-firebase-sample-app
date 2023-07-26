import { FirebaseApp } from 'firebase/app';
import Todo from '@/lib/entities/todo';
import TodoRepository from '@/lib/usecases/todo-repository';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';

export default class FirestoreTodoRepository implements TodoRepository {
  readonly #db;
  readonly #userId;
  readonly #todosCollection;

  constructor(app: FirebaseApp, userId: string) {
    this.#db = getFirestore(app);
    this.#userId = userId;
    this.#todosCollection = collection(doc(this.#db, 'users', userId), 'todos');
  }

  async save(todo: Todo) {
    const now = new Date();
    const todoDocRef = await addDoc(this.#todosCollection, {
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      created_at: now,
      updated_at: now,
    });
    return new Todo(
      todo.userId,
      todo.title,
      todo.description,
      todo.completed,
      todoDocRef.id,
      now,
      now,
    );
  }

  async findOne(id: string) {
    const docData = (await getDoc(doc(this.#todosCollection, id))).data();
    return docData === undefined
      ? null
      : new Todo(
          docData.user.id,
          docData.title,
          docData.description,
          docData.completed,
          id,
          docData.created_at.toDate(),
          docData.updated_at.toDate(),
        );
  }

  async findAll() {
    const querySnapshot = await getDocs(this.#todosCollection);
    return querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return new Todo(
        this.#userId,
        docData.title,
        docData.description,
        docData.completed,
        doc.id,
        docData.created_at.toDate(),
        docData.updated_at.toDate(),
      );
    });
  }

  async update(todo: Todo) {
    const updatedAt = new Date();
    await updateDoc(doc(this.#todosCollection, todo.id), {
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      updated_at: updatedAt,
    });
    return new Todo(
      todo.userId,
      todo.title,
      todo.description,
      todo.completed,
      todo.id,
      todo.createdAt,
      updatedAt,
    );
  }

  async delete(id: string) {
    await deleteDoc(doc(this.#todosCollection, id));
  }

  async deleteAll() {
    const querySnapshot = await getDocs(this.#todosCollection);
    const batch = writeBatch(this.#db);
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
}
