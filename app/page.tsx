'use client';

import { useEffect, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import NewTodo from '@/components/new-todo';
import { useStateContext } from '@/components/state-provider';
import TodoList from '@/components/todo-list';
import { ToShowTodoType } from '@/lib/etc/to-show-todo-type';
import FirebaseAuthAdapter from '@/lib/adapters/firebase-auth-adapter';
import Todo from '@/lib/entities/todo';

const firebaseAuthAdapter = new FirebaseAuthAdapter();

export default function Home() {
  const [toShowTodoType, setToShowTodoType] = useState<ToShowTodoType>(
    ToShowTodoType.Incomplete,
  );
  const { todoRepository, currentUser, isAuthenticating } = useStateContext();

  const fetcher: Fetcher<Todo[], ToShowTodoType> = async (
    key: ToShowTodoType,
  ) => {
    if (todoRepository === undefined) return [];

    return await todoRepository.findAll(key === ToShowTodoType.Completed);
  };

  const { data: incompleteTodos, mutate: mutateIncompleteTodos } = useSWR(
    ToShowTodoType.Incomplete,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const { data: completedTodos, mutate: mutateCompletedTodos } = useSWR(
    ToShowTodoType.Completed,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (
      toShowTodoType === ToShowTodoType.Completed &&
      completedTodos !== undefined
    ) {
      setTodos(completedTodos);
      return;
    }

    if (incompleteTodos === undefined) return;
    setTodos(incompleteTodos);
  }, [toShowTodoType, completedTodos, incompleteTodos]);

  useEffect(() => {
    if (currentUser === null) return;

    mutateIncompleteTodos();
    mutateCompletedTodos();
  }, [currentUser, mutateIncompleteTodos, mutateCompletedTodos]);

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
          <NewTodo mutateIncompleteTodos={mutateIncompleteTodos} />
          <TodoList
            todos={todos === undefined ? [] : todos}
            mutateIncompleteTodos={mutateIncompleteTodos}
            mutateCompletedTodos={mutateCompletedTodos}
            toShowTodoType={toShowTodoType}
            setToShowTodoType={setToShowTodoType}
          />
        </>
      )}
    </>
  );
}
