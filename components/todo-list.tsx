import { KeyedMutator } from 'swr';
import TodoItem from '@/components/todo-item';
import Todo from '@/lib/entities/todo';

type Props = {
  todos: Todo[];
  mutateTodos: KeyedMutator<Todo[]>;
};

export default function TodoList(props: Props) {
  return (
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
          <TodoItem key={todo.id} todo={todo} mutateTodos={props.mutateTodos} />
        ))}
      </tbody>
    </table>
  );
}
