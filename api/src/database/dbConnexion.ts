'use strict';
import { Sequelize } from 'sequelize';
import process from 'process';
import config from './config/config.json';
import { logger } from '../shared/utils/logger';
const env = process.env.NODE_ENV || 'development';
const dbName = config[env].database as string;
const dbUser = config[env].username as string;
const dbHost = config[env].host as string;
const dbPassword = config[env].password as string;
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  database: dbName,
  host: dbHost,
  define: {
    timestamps: true
  },
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 100,
    min: 0,
    acquire: 80000,
    idle: 1000
  }
});
sequelizeConnection
  .authenticate()
  .then(() => {
    logger.info('[Mysql] Connection has been established successfully.');
  })
  .catch((err) => {
    logger.fatal(`[Mysql] Unable to connect to the database:${err.message}`);
  });
export default sequelizeConnection;
