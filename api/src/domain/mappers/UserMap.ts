import { Mapper } from '../../core/logic/Mapper';
import { User } from '../entities/user';

export class UserMap implements Mapper<User> {
  public static async toPersistence(user: User): Promise<any> {
    return {
      userName: user.userName,
      email: user.email,
      password: user.password,
      imagePath: user.imagePath,
      role: user.role
    };
  }
  public static toAdminFullDto(row: any): any {
    return {
      id: row.id,
      userName: row.userName,
      email: row.email,
      imagePath: row.imagePath,
      role: row.role,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }
}
