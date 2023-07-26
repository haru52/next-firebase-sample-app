'use client';

import { KeyedMutator } from 'swr';
import { useStateContext } from '@/components/state-provider';
import Todo from '@/lib/entities/todo';

type Props = {
  todo: Todo;
  mutateTodos: KeyedMutator<Todo[]>;
};

export default function TodoItem(props: Props) {
  const { todoRepository } = useStateContext();

  const handleDoneCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todoRepository === undefined)
      throw new Error('todoRepository is undefined');

    props.todo.completed = e.target.checked;
    todoRepository.update(props.todo);
    props.mutateTodos();
  };

  const handleDeleteBtnClick = () => {
    if (todoRepository === undefined)
      throw new Error('todoRepository is undefined');
    if (props.todo.id === undefined) throw new Error('todo.id is undefined');

    todoRepository.delete(props.todo.id);
    props.mutateTodos();
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          defaultChecked={props.todo.completed}
          onChange={handleDoneCheckboxChange}
        />
      </td>
      <td className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${props.todo.id}`}
            aria-expanded="false"
            aria-controls={props.todo.id}
          >
            {props.todo.title}
          </button>
        </h2>
        <div id={props.todo.id} className="accordion-collapse collapse">
          <div className="accordion-body">{props.todo.description}</div>
        </div>
      </td>
      <td>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleDeleteBtnClick}
        ></button>
      </td>
    </tr>
  );
}
