import { Dispatch, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';
import TodoItem from '@/components/todo-item';
import { TodosType } from '@/lib/todos-types';
import Todo from '@/lib/entities/todo';

type Props = {
  todos: Todo[];
  mutateTodos: KeyedMutator<Todo[]>;
  selectedTodoType: string;
  setSelectedTodoType: Dispatch<SetStateAction<TodosType>>;
};

export default function TodoList(props: Props) {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSelectedTodoType(event.target.value as TodosType);
  };

  return (
    <>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="todos-type"
          id="incomplete-todos"
          value="incomplete-todos"
          checked={props.selectedTodoType === "incomplete-todos"}
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="incomplete-todos">
          Incomplete ToDos
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="todos-type"
          id="completed-todos"
          value="completed-todos"
          checked={props.selectedTodoType === "completed-todos"}
          onChange={handleOptionChange}
        />
        <label className="form-check-label" htmlFor="completed-todos">
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
              mutateTodos={props.mutateTodos}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
