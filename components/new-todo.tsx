'use client';

import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { useStateContext } from '@/components/state-provider';
import Todo from '@/lib/entities/todo';

type Props = {
  mutate: KeyedMutator<Todo[]>;
};

export default function NewTodo(props: Props) {
  const { todoRepository, currentUser } = useStateContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (currentUser === null) throw new Error('User is not logged in');

    const todo = new Todo(currentUser.id, title, description);
    setTitle('');
    setDescription('');
    if (todoRepository !== undefined) {
      todoRepository.save(todo);
      props.mutate();
    }
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          autoFocus
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows={3}
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add ToDo
      </button>
    </form>
  );
}
