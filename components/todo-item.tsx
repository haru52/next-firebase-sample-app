'use client';

import Todo from '@/lib/entities/todo';
import { useStateContext } from '@/components/state-provider';
import { KeyedMutator } from 'swr';

type Props = {
  todo: Todo;
  mutateTodos: KeyedMutator<Todo[]>;
};

export default function TodoItem(props: Props) {
  const { todoRepository } = useStateContext();

  const handleDeleteBtnClick = () => {
    if (todoRepository === undefined)
      throw new Error('todoRepository is undefined');
    if (props.todo.id === undefined) throw new Error('todo.id is undefined');

    todoRepository.delete(props.todo.id);
    props.mutateTodos();
  };

  return (
    <li>
      {props.todo.title}: {props.todo.description}{' '}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={handleDeleteBtnClick}
      ></button>
    </li>
  );
}
