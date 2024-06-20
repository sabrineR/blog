import Joi from 'joi';
import { Entity } from '../../core/logic/Entity';
import { Result } from '../../core/logic/Result';

interface UserProps {
  id?: number;
  userName: string;
  email: string;
  password: string;
  imagePath?: string;
  role: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: number) {
    super(props, id);
  }

  get id(): number {
    return this._id;
  }

  get userName(): string {
    return this.props.userName;
  }

  set userName(userName: string) {
    this.props.userName = userName;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }
  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }
  get imagePath(): string {
    return this.props.imagePath;
  }

  set imagePath(imagePath: string) {
    this.props.imagePath = imagePath;
  }

  get role(): boolean {
    return this.props.role;
  }

  set role(role: boolean) {
    this.props.role = role;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  public static create(props: UserProps, id?: number): Result<User> {
    const schema = Joi.object().keys({
      userName: Joi.string().min(2).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
      imagePath: Joi.string().allow(null),
      role: Joi.boolean().required()
    });

    const { error } = schema.validate(props, { abortEarly: false }); // Ajoutez l'option abortEarly: false

    if (error) {
      const messages = error.details.map((err) => err.message).join(', ');
      return Result.fail<User>(messages);
    } else {
      return Result.ok<User>(
        new User(
          {
            ...props
          },
          id
        )
      );
    }
  }
}
