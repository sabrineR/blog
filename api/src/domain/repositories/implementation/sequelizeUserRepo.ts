import { IUserRepo } from '../userRepo';
import { User } from '../../entities/user';
import { UserMap } from '../../mappers/UserMap';

export class SequelizeUserRepo implements IUserRepo {
  private models: any;

  public constructor(models: any) {
    this.models = models;
  }

  public save = async (user: User): Promise<number> => {
    const rawUser = await UserMap.toPersistence(user);
    let exists: boolean = false;
    if (user?.id) {
      exists = await this.exists(user.id);
    }
    let userModel;
    try {
      if (!exists) {
        userModel = await this.models.User.create(rawUser);
      } else {
        await this.models.User.update(rawUser, {
          where: {
            id: user.id
          }
        });

        userModel = await this.models.User.findOne({
          where: { id: user.id }
        });
      }
    } catch (error) {
      console.warn(error);
      throw new Error(`'User sequelize error.'`);
    }
    return userModel.id;
  };
  public login = async (email: string): Promise<any> => {
    const user = await this.models.User.findOne({
      where: {
        email
      }
    });
    if (!user) throw new Error('User email not found.');
    return user;
  };
  async exists(id: number): Promise<boolean> {
    const user = await this.models.User.findOne({
      where: {
        id
      }
    });
    return !!user === true;
  }
  public getUserByID = async (id: number): Promise<User> => {
    const user = await this.models.User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) throw new Error('No user found with the specified ID.');
    return user;
  };

  public deleteUserById = async (id: number): Promise<boolean> => {
    const user = await this.models.User.findOne({ where: { id } });
    const found = !!user === true;
    if (!found) throw new Error('User not found');
    user.destroy({ where: { id } });
    return true;
  };

  public getUsers = async (): Promise<any> => {
    const result = await this.models.User.findAll({
      where: { role: false },
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    if (!result) throw new Error('No User found.');
    result.map((user) => UserMap.toAdminFullDto(user.dataValues));
    return result;
  };
}
