'use client';

import { useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
import NewTodo from '@/components/new-todo';
import { useStateContext } from '@/components/state-provider';
import TodoList from '@/components/todo-list';
import FirebaseAuthAdapter from '@/lib/adapters/firebase-auth-adapter';
import Todo from '@/lib/entities/todo';

const firebaseAuthAdapter = new FirebaseAuthAdapter();

export default function Home() {
  const { todoRepository, currentUser, isAuthenticating } = useStateContext();

  const fetcher: Fetcher<Todo[], string> = async () => {
    if (todoRepository === undefined) return [];

    return await todoRepository.findAll();
  };

  const { data: todos, mutate } = useSWR(`todos`, fetcher);

  useEffect(() => {
    if (currentUser === null) return;
    mutate();
  }, [currentUser, mutate]);

  const handleLoginBtnClick = async () => {
    await firebaseAuthAdapter.login();
  };

  return (
    <>
      {isAuthenticating ? (
        <p>Loading...</p>
      ) : currentUser === null ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLoginBtnClick}
        >
          Login with Google
        </button>
      ) : (
        <>
          <NewTodo mutate={mutate} />
          <TodoList
            todos={todos === undefined ? [] : todos}
            mutateTodos={mutate}
          />
        </>
      )}
    </>
  );
}
