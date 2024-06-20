import Joi from 'joi';
import { Entity } from '../../core/logic/Entity';
import { Result } from '../../core/logic/Result';

interface PostProps {
  id?: number;
  userId: number;
  title: string;
  content: string;
  imagePath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Post extends Entity<PostProps> {
  constructor(props: PostProps, id?: number) {
    super(props, id);
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this.props.userId;
  }

  set userId(userId: number) {
    this.props.userId = userId;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }
  get content(): string {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
  }
  get imagePath(): string {
    return this.props.imagePath;
  }

  set imagePath(imagePath: string) {
    this.props.imagePath = imagePath;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  public static create(props: PostProps, id?: number): Result<Post> {
    const schema = Joi.object().keys({
      userId: Joi.number().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      imagePath: Joi.string().allow(null)
    });

    const { error } = schema.validate(props, { abortEarly: false });

    if (error) {
      const messages = error.details.map((err) => err.message).join(', ');
      return Result.fail<Post>(messages);
    } else {
      return Result.ok<Post>(
        new Post(
          {
            ...props
          },
          id
        )
      );
    }
  }
}
