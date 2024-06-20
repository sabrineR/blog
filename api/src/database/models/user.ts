import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelizeConnection from '../dbConnexion';
// Définition des attributs du modèle User
interface UserAttributes {
  id?: number;
  userName: string;
  email: string;
  password: string;
  imagePath?: string;
  role: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Certains attributs sont optionnels lors de la création d'un utilisateur
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
  public imagePath!: string;
  public role!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Méthodes personnalisées et associations peuvent être définies ici
  public static associate(models: any) {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'users',
    sequelize: sequelizeConnection,
    timestamps: true
  }
);

export { User, UserAttributes, UserCreationAttributes };
