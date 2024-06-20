import { IPostRepo } from '../postRepo';
import { PostMap } from '../../mappers/PostMap';
import { Post } from '../../entities/post';
import { User } from '../../../database/models/user';
import { Comment } from '../../../database/models/comment';

export class SequelizePostRepo implements IPostRepo {
  private models: any;
  public constructor(models: any) {
    this.models = models;
  }

  public save = async (post: Post): Promise<number> => {
    const rawPost = await PostMap.toPersistence(post);
    let exists: boolean = false;
    if (post?.id) {
      exists = await this.exists(post.id);
    }
    let postModel;
    try {
      if (!exists) {
        postModel = await this.models.Post.create(rawPost);
      } else {
        await this.models.Post.update(rawPost, {
          where: {
            id: post.id
          }
        });
        postModel = await this.models.Post.findOne({
          where: { id: post.id }
        });
      }
      return postModel.id;
    } catch (error) {
      console.warn(error);
      throw new Error(`'Post sequelize error.'`);
    }
  };

  async exists(id: number): Promise<boolean> {
    const post = await this.models.Post.findOne({
      where: {
        id
      }
    });
    return !!post === true;
  }

  public getPostByID = async (id: number): Promise<Post> => {
    const post = await this.models.Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['username', 'imagePath']
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username', 'imagePath']
            }
          ],
          order: [['createdAt', 'DESC']]
        }
      ]
    });
    if (!post) throw new Error('No post found with the specified ID.');
    // Récupération des commentaires triés
    const sortedComments = post.Comments.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Remplacement des commentaires non triés par les commentaires triés
    post.Comments = sortedComments;

    return post;
  };
  public getPostByUser = async (userId: number): Promise<Post> => {
    const post = await this.models.Post.findAll({
      where: {
        userId: userId
      },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username', 'imagePath']
            }
          ]
        }
      ]
    });
    if (!post) throw new Error('No post found with the specified ID.');
    return post;
  };
  public deletePostById = async (id: number): Promise<boolean> => {
    const Post = await this.models.Post.findOne({ where: { id } });
    const found = !!Post === true;
    if (!found) throw new Error('Post not found');
    Post.destroy({ where: { id } });
    return true;
  };

  public getPosts = async (): Promise<any> => {
    const posts = await this.models.Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'imagePath']
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username', 'imagePath']
            }
          ],
          order: [['createdAt', 'DESC']] //Sort comments by createdAt field in descending order
        }
      ],
      order: [['createdAt', 'DESC']] // Sort by createdAt field in descending order
    });
    if (!posts) throw new Error('No Post found.');
    return posts;
  };
}
