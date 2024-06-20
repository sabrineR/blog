import models from '../../database/models';
import { SequelizeCommentRepo } from './implementation/sequelizeCommentRepo';
import { SequelizePostRepo } from './implementation/sequelizePostRepo';
import { SequelizeUserRepo } from './implementation/sequelizeUserRepo';
const userRepo = new SequelizeUserRepo(models);
const postRepo = new SequelizePostRepo(models);
const commentRepo = new SequelizeCommentRepo(models);
export { userRepo, postRepo, commentRepo };
