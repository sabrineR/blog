import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AuthRoutes } from './infra/routes/auth.routes.config';
import { UserRoutes } from './infra/routes/user.routes.config';
import { PostRoutes } from './infra/routes/post.routes.config';
import { CommentRoutes } from './infra/routes/comment.routes.config';
const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/blog', new AuthRoutes().router);
app.use('/api/blog/admin', new UserRoutes().router);
app.use('/api/blog/posts', new PostRoutes().router);
app.use('/api/blog/comments', new CommentRoutes().router);
export default app;