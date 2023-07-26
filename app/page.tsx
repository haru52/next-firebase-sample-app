'use client';

import { useEffect, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import NewTodo from '@/components/new-todo';
import { useStateContext } from '@/components/state-provider';
import TodoList from '@/components/todo-list';
import { TodosType } from '@/lib/todos-types';
import FirebaseAuthAdapter from '@/lib/adapters/firebase-auth-adapter';
import Todo from '@/lib/entities/todo';

const firebaseAuthAdapter = new FirebaseAuthAdapter();

export default function Home() {
  const [selectedTodoType, setSelectedTodoType] = useState<TodosType>(
    TodosType.Incomplete,
  );
  const { todoRepository, currentUser, isAuthenticating } = useStateContext();

  const fetcher: Fetcher<Todo[], TodosType> = async (key: TodosType) => {
    if (todoRepository === undefined) return [];

    return await todoRepository.findAll(key === TodosType.Completed);
  };

  const { data: todos, mutate } = useSWR(selectedTodoType, fetcher, {
    revalidateOnFocus: false,
  });

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
            selectedTodoType={selectedTodoType}
            setSelectedTodoType={setSelectedTodoType}
          />
        </>
      )}
    </>
  );
}
