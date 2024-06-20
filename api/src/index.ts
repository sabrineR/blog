import * as dotenv from 'dotenv';
import { logger } from './shared/utils/logger';
import app from './app';
import sequelizeConnection from './database/dbConnexion';
sequelizeConnection
dotenv.config();
sequelizeConnection
const PORT: number = parseInt(process.env.PORT as string, 10)||5000;
app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
