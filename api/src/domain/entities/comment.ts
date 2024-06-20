import Joi from 'joi';
import { Entity } from '../../core/logic/Entity';
import { Result } from '../../core/logic/Result';

interface CommentProps {
  id?: number;
  userId: number;
  postId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Comment extends Entity<CommentProps> {
  constructor(props: CommentProps, id?: number) {
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

  get postId(): number {
    return this.props.postId;
  }

  set postId(postId: number) {
    this.props.postId = postId;
  }

  get content(): string {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  public static create(props: CommentProps, id?: number): Result<Comment> {
    const schema = Joi.object().keys({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
      content: Joi.string().required()
    });

    const { error } = schema.validate(props, { abortEarly: false });

    if (error) {
      const messages = error.details.map((err) => err.message).join(', ');
      return Result.fail<Comment>(messages);
    } else {
      return Result.ok<Comment>(
        new Comment(
          {
            ...props
          },
          id
        )
      );
    }
  }
}
