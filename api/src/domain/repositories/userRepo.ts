import { User } from '../entities/user';
export interface IUserRepo {
  save(user: User): Promise<number>;
  login(email: string): Promise<any>;
  getUserByID(id: number): Promise<User>;
  deleteUserById(id: number): Promise<boolean>;
  getUsers(): Promise<any>;
}
