import { ICommentRepo } from '../commentRepo';
import { CommentMap } from '../../mappers/CommentMap';
import { Comment } from '../../entities/comment';
import { User } from '../../../database/models/user';
import { Op } from 'sequelize';
import { Post } from '../../../database/models/post';
export class SequelizeCommentRepo implements ICommentRepo {
  private models: any;
  public constructor(models: any) {
    this.models = models;
  }

  public save = async (comment: Comment): Promise<number> => {
    const rawComment = await CommentMap.toPersistence(comment);
    let exists: boolean = false;
    if (comment?.id) {
      exists = await this.exists(comment.id);
    }
    let commentModel;
    try {
      if (!exists) {
        commentModel = await this.models.Comment.create(rawComment);
      } else {
        await this.models.Comment.update(rawComment, {
          where: {
            id: comment.id
          }
        });
        commentModel = await this.models.Comment.findOne({
          where: { id: comment.id }
        });
      }
      return commentModel.id;
    } catch (error) {
      console.warn(error);
      throw new Error(`'Comment sequelize error.'`);
    }
  };

  async exists(id: number): Promise<boolean> {
    const Comment = await this.models.Comment.findOne({
      where: {
        id
      }
    });
    return !!Comment === true;
  }

  public findCommentsInLast24Hours = async (): Promise<any> => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    // Récupérer les commentaires des dernières 24 heures
    const comments = await this.models.Comment.findAll({
      where: {
        createdAt: {
          [Op.gt]: yesterday
        }
      },
      include: [
        { model: User, attributes: ['id', 'userName', 'imagePath'] },
        { model: Post }
      ],
      order: [['createdAt', 'DESC']]
    });
    return comments;
  };

  public getCommentByID = async (id: number): Promise<User> => {
    const comment = await this.models.Comment.findByPk(id);
    if (!comment) throw new Error('No comment found with the specified ID.');
    return comment;
  };

  public deleteCommentById = async (id: number): Promise<boolean> => {
    const comment = await this.models.Comment.findOne({ where: { id } });
    const found = !!comment === true;
    if (!found) throw new Error('Comment not found');
    comment.destroy({ where: { id } });
    return true;
  };

  public getComments = async (): Promise<any> => {
    const Comments = await this.models.Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'imagePath']
        }
      ]
    });
    if (!Comments) throw new Error('No Comment found.');
    return Comments;
  };
}
