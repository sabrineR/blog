'use strict';
import { Sequelize } from 'sequelize';
import { User } from './user';
import { Post } from './post';
import { Comment } from './comment';
import sequelizeConnection from '../dbConnexion';

const models: any = {
  User,
  Post,
  Comment
};

for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' &&
    models[model].associate(models);
}

models.sequelize = sequelizeConnection;
models.Sequelize = Sequelize;
export default models;
