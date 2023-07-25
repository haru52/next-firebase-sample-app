import TodoItem from '@/components/todo-item';
import Todo from '@/lib/entities/todo';
import { KeyedMutator } from 'swr';

type Props = {
  todos: Todo[];
  mutateTodos: KeyedMutator<Todo[]>;
};

export default function TodoList(props: Props) {
  return (
    <ul>
      {props.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} mutateTodos={props.mutateTodos} />
      ))}
    </ul>
  );
}
