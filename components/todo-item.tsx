'use client';

import { KeyedMutator } from 'swr';
import { useStateContext } from '@/components/state-provider';
import Todo from '@/lib/entities/todo';
import { ToShowTodoType } from '@/lib/etc/to-show-todo-type';

type Props = {
  todo: Todo;
  mutateIncompleteTodos: KeyedMutator<Todo[]>;
  mutateCompletedTodos: KeyedMutator<Todo[]>;
  toShowTodoType: ToShowTodoType;
};

export default function TodoItem(props: Props) {
  const { todoRepository } = useStateContext();

  const handleDoneCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todoRepository === undefined)
      throw new Error('todoRepository is undefined');

    props.todo.completed = e.target.checked;
    (async () => {
      await todoRepository.update(props.todo);
      props.mutateIncompleteTodos();
      props.mutateCompletedTodos();
    })();
  };

  const handleDeleteBtnClick = () => {
    if (todoRepository === undefined)
      throw new Error('todoRepository is undefined');

    (async () => {
      if (props.todo.id === undefined) throw new Error('todo.id is undefined');

      await todoRepository.delete(props.todo.id);
      props.toShowTodoType === ToShowTodoType.Completed
        ? props.mutateCompletedTodos()
        : props.mutateIncompleteTodos();
    })();
  };

  const textToHtmlText = (text: string) => {
    return text.replace(/\n/g, '<br />');
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
          <div
            className="accordion-body"
            dangerouslySetInnerHTML={{
              __html: textToHtmlText(props.todo.description),
            }}
          ></div>
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
