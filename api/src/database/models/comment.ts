import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelizeConnection from '../dbConnexion';
// Définition des attributs du modèle Comment
interface CommentAttributes {
  id?: number;
  userId: number;
  postId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Certains attributs sont optionnels lors de la création d'un comment
interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;
  public userId!: number;
  public postId!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId'
    });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    }
  },
  {
    tableName: 'comments',
    sequelize: sequelizeConnection,
    timestamps: true
  }
);

export { Comment, CommentAttributes, CommentCreationAttributes };
