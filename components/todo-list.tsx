import { Dispatch, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';
import TodoItem from '@/components/todo-item';
import Todo from '@/lib/entities/todo';
import { ToShowTodoType } from '@/lib/etc/to-show-todo-type';

type Props = {
  todos: Todo[];
  mutateIncompleteTodos: KeyedMutator<Todo[]>;
  mutateCompletedTodos: KeyedMutator<Todo[]>;
  toShowTodoType: ToShowTodoType;
  setToShowTodoType: Dispatch<SetStateAction<ToShowTodoType>>;
};

export default function TodoList(props: Props) {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setToShowTodoType(event.target.value as ToShowTodoType);
  };

  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="todos-type"
          id={ToShowTodoType.Incomplete}
          value={ToShowTodoType.Incomplete}
          checked={props.toShowTodoType === ToShowTodoType.Incomplete}
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor={ToShowTodoType.Incomplete}>
          Incomplete ToDos
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="todos-type"
          id={ToShowTodoType.Completed}
          value={ToShowTodoType.Completed}
          checked={props.toShowTodoType === ToShowTodoType.Completed}
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor={ToShowTodoType.Completed}>
          Completed ToDos
        </label>
      </div>
      <table className="table accordion">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" style={{ width: '10000px' }}></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              mutateIncompleteTodos={props.mutateIncompleteTodos}
              mutateCompletedTodos={props.mutateCompletedTodos}
              toShowTodoType={props.toShowTodoType}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
