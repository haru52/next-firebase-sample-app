'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import FirebaseAppAdapter from '@/lib/adapters/firebase-app-adapter';
import FirebaseAuthAdapter from '@/lib/adapters/firebase-auth-adapter';
import User from '@/lib/entities/user';
import UserRepository from '@/lib/usecases/user-repository';
import FirestoreUserRepository from '@/lib/adapters/repositories/firestore-user-repository';
import FirestoreTodoRepository from '@/lib/adapters/repositories/firestore-todo-repository';
import TodoRepository from '@/lib/usecases/todo-repository';

FirebaseAppAdapter.initialize();
const firebaseAuthAdapter = new FirebaseAuthAdapter();
const firebaseApp = FirebaseAppAdapter.getApp();
const userRepository: UserRepository = new FirestoreUserRepository(firebaseApp);

const StateContext = createContext<{
  userRepository: UserRepository;
  todoRepository?: TodoRepository;
  currentUser: User | null;
  isAuthenticating: boolean;
}>({
  userRepository,
  currentUser: null,
  isAuthenticating: true,
});

export default function StateProvider({ children }: { children: JSX.Element }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const todoRepository = useMemo(() => {
    if (currentUser === null) return undefined;

    return new FirestoreTodoRepository(firebaseApp, currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    setIsAuthenticating(true);
    firebaseAuthAdapter.onAuthStateChanged((firebaseUser) => {
      if (
        firebaseUser === null ||
        firebaseUser.email === null ||
        firebaseUser.displayName === null
      ) {
        setCurrentUser(null);
        setIsAuthenticating(false);
        return;
      }

      const currentUser = new User(
        firebaseUser.uid,
        firebaseUser.email,
        firebaseUser.displayName,
      );
      setCurrentUser(currentUser);
      setIsAuthenticating(false);
    });
  }, []);
  return (
    <StateContext.Provider
      value={{
        userRepository,
        todoRepository,
        currentUser,
        isAuthenticating,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
