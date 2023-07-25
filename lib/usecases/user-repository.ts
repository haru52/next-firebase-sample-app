import User from '@/lib/entities/user';

export default interface UserRepository {
  save(user: User): Promise<User>;
  findOne(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
}
