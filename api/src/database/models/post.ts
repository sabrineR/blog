import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelizeConnection from '../dbConnexion';
// Définition des attributs du modèle Post
interface PostAttributes {
  id?: number;
  userId: number;
  title: string;
  content: string;
  imagePath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Certains attributs sont optionnels lors de la création d'un post
interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostCreationAttributes
{
  public id!: number;
  public userId!: number;
  public title!: string;
  public content!: string;
  public imagePath!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Méthodes personnalisées et associations peuvent être définies ici
  public static associate(models: any) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      onDelete: 'CASCADE'
    });
  }
}
Post.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'posts',
    sequelize: sequelizeConnection,
    timestamps: true
  }
);

export { Post, PostAttributes, PostCreationAttributes };
