import Todo from '@/lib/entities/todo';

export default interface TodoRepository {
  save(todo: Todo): Promise<Todo>;
  findOne(id: string): Promise<Todo | null>;
  findAll(completed: boolean): Promise<Todo[]>;
  update(todo: Todo): Promise<Todo>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}
